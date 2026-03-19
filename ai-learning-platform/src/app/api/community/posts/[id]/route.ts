import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 获取帖子详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.communityPost.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, avatar: true }
        },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            author: {
              select: { id: true, name: true, avatar: true }
            }
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: '帖子不存在' }, { status: 404 })
    }

    // 增加浏览量
    await prisma.communityPost.update({
      where: { id: post.id },
      data: { viewCount: post.viewCount + 1 }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('获取帖子详情错误:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// 发表评论
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'token 无效' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { content } = body

    const result = await prisma.comment.create({
      data: {
        content,
        postId: params.id,
        authorId: payload.userId
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('发表评论错误:', error)
    return NextResponse.json({ error: '评论失败' }, { status: 500 })
  }
}
