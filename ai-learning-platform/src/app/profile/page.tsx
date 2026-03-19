'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">个人中心</h1>
      
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
            {user.name?.[0] || user.email[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name || '未设置昵称'}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">用户ID</span>
            <span className="font-mono text-sm">{user.id}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">角色</span>
            <span className="text-primary-600">{user.role === 'ADMIN' ? '管理员' : '普通用户'}</span>
          </div>
        </div>
      </div>

      {/* 功能快捷入口 */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <a href="/profile/conversations" className="p-4 bg-white border rounded-lg hover:shadow-md transition">
          <div className="text-2xl mb-2">💬</div>
          <div className="font-medium">我的对话</div>
        </a>
        <a href="/profile/settings" className="p-4 bg-white border rounded-lg hover:shadow-md transition">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="font-medium">设置</div>
        </a>
        <a href="/admin" className="p-4 bg-white border rounded-lg hover:shadow-md transition">
          <div className="text-2xl mb-2">🛠️</div>
          <div className="font-medium">管理后台</div>
        </a>
      </div>
    </div>
  )
}
