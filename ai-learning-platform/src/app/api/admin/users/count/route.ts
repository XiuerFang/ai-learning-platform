import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 验证管理员权限
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null
  
  const token = authHeader.substring(7)
  const payload = verifyToken(token)
  if (!payload || payload.role !== 'ADMIN') return null
  
  return payload
}

// 用户数量统计
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const count = await prisma.user.count()
  return NextResponse.json({ count })
}
