import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取工具列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  try {
    const where: any = {}
    if (category) where.category = category

    const tools = await prisma.aiTool.findMany({
      where,
      orderBy: [
        { isHot: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error('获取工具列表错误:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// 创建工具
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, nameEn, description, icon, url, category, tags, isPremium, isHot, sortOrder } = body

    const result = await prisma.aiTool.create({
      data: {
        name,
        nameEn,
        description,
        icon,
        url,
        category,
        tags: tags || '',
        isPremium: isPremium || false,
        isHot: isHot || false,
        sortOrder: sortOrder || 0
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('创建工具错误:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
