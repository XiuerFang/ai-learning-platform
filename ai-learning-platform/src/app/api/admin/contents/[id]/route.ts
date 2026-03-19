import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null
  const token = authHeader.substring(7)
  const payload = verifyToken(token)
  if (!payload || payload.role !== 'ADMIN') return null
  return payload
}

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const contents = await prisma.learningContent.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      published: true,
      viewCount: true,
      createdAt: true
    }
  })

  return NextResponse.json({ contents })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const body = await request.json()
  const { published } = body

  await prisma.learningContent.update({
    where: { id: params.id },
    data: { published }
  })

  return NextResponse.json({ message: '更新成功' })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  await prisma.learningContent.delete({
    where: { id: params.id }
  })

  return NextResponse.json({ message: '删除成功' })
}
