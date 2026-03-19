'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  users: number
  contents: number
  tools: number
  posts: number
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({ users: 0, contents: 0, tools: 0, posts: 0 })

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    try {
      const [usersRes, contentsRes, toolsRes, postsRes] = await Promise.all([
        fetch('/api/admin/users/count'),
        fetch('/api/admin/contents/count'),
        fetch('/api/admin/tools/count'),
        fetch('/api/admin/posts/count')
      ])
      
      setStats({
        users: (await usersRes.json()).count || 0,
        contents: (await contentsRes.json()).count || 0,
        tools: (await toolsRes.json()).count || 0,
        posts: (await postsRes.json()).count || 0
      })
    } catch (error) {
      console.error('获取统计失败:', error)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  const cards = [
    { title: '用户', count: stats.users, icon: '👥', href: '/admin/users', color: 'bg-blue-50' },
    { title: '内容', count: stats.contents, icon: '📚', href: '/admin/contents', color: 'bg-green-50' },
    { title: '工具', count: stats.tools, icon: '🛠️', href: '/admin/tools', color: 'bg-purple-50' },
    { title: '帖子', count: stats.posts, icon: '💬', href: '/admin/posts', color: 'bg-orange-50' }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">管理后台</h1>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`${card.color} border rounded-lg p-6 hover:shadow-md transition`}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="text-2xl font-bold">{card.count}</div>
            <div className="text-gray-600">{card.title}</div>
          </Link>
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">快捷操作</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/admin/contents/new" className="p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="font-medium">发布新内容</div>
            <div className="text-sm text-gray-500">创建新的学习文章</div>
          </Link>
          <Link href="/admin/tools/new" className="p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="font-medium">添加新工具</div>
            <div className="text-sm text-gray-500">添加新的 AI 工具</div>
          </Link>
          <Link href="/admin/users" className="p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="font-medium">管理用户</div>
            <div className="text-sm text-gray-500">查看和管理用户</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
