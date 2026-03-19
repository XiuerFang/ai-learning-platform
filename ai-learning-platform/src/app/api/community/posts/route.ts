import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 获取帖子列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  try {
    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          author: {
            select: { id: true, name: true, avatar: true }
          },
          _count: {
            select: { comments: true }
          }
        }
      }),
      prisma.communityPost.count()
    ])

    return NextResponse.json({
      posts,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    console.error('获取帖子列表错误:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// 创建帖子
export async function POST(request: NextRequest) {
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
    const { title, content, tags } = body

    const result = await prisma.communityPost.create({
      data: {
        title,
        content,
        tags: tags || '',
        authorId: payload.userId
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('创建帖子错误:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
