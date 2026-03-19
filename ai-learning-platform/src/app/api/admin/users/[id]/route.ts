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

// 获取用户列表
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  })

  return NextResponse.json({ users })
}

// 更新用户角色
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const { role } = await request.json()

  await prisma.user.update({
    where: { id: params.id },
    data: { role }
  })

  return NextResponse.json({ message: '更新成功' })
}

// 删除用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  await prisma.user.delete({
    where: { id: params.id }
  })

  return NextResponse.json({ message: '删除成功' })
}
