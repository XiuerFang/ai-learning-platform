import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 获取内容列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const published = searchParams.get('published')
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  try {
    const where: any = {}
    if (category) where.category = category
    if (published !== null) where.published = published === 'true'

    const [contents, total] = await Promise.all([
      prisma.learningContent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.learningContent.count({ where })
    ])

    return NextResponse.json({
      contents,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    console.error('获取内容列表错误:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// 创建内容
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
    const { title, slug, description, content, coverImage, category, tags, authorName, published } = body

    const result = await prisma.learningContent.create({
      data: {
        title,
        slug,
        description,
        content,
        coverImage,
        category,
        tags: tags || '',
        authorId: payload.userId,
        authorName: authorName || payload.email,
        published: published || false
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('创建内容错误:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
