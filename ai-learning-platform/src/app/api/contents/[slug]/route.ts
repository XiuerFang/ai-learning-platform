import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const content = await prisma.learningContent.findUnique({
      where: { slug: params.slug }
    })

    if (!content) {
      return NextResponse.json({ error: '内容不存在' }, { status: 404 })
    }

    // 增加浏览量
    await prisma.learningContent.update({
      where: { id: content.id },
      data: { viewCount: content.viewCount + 1 }
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('获取内容错误:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}
