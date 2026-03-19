'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Content {
  id: string
  title: string
  slug: string
  category: string
  published: boolean
  viewCount: number
  createdAt: string
}

export default function AdminContentsPage() {
  const { user, token, loading } = useAuth()
  const router = useRouter()
  const [contents, setContents] = useState<Content[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.role === 'ADMIN' && token) {
      fetchContents()
    }
  }, [user, token])

  const fetchContents = async () => {
    setFetching(true)
    try {
      const res = await fetch('/api/admin/contents/list', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setContents(data.contents || [])
    } catch (error) {
      console.error('获取内容失败:', error)
    }
    setFetching(false)
  }

  const handlePublish = async (id: string, published: boolean) => {
    try {
      await fetch(`/api/admin/contents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ published })
      })
      fetchContents()
    } catch (error) {
      console.error('更新失败:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return
    try {
      await fetch(`/api/admin/contents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchContents()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  if (loading || !user || user.role !== 'ADMIN') {
    return <div className="p-8 text-center">加载中...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">内容管理</h1>
        <div className="flex gap-4">
          <Link href="/admin" className="text-primary-600 hover:underline">
            ← 返回后台
          </Link>
          <Link href="/admin/contents/new" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            发布新内容
          </Link>
        </div>
      </div>

      {fetching ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">标题</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">分类</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">阅读</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">时间</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contents.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/learn/${c.slug}`} className="hover:text-primary-600">
                      {c.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handlePublish(c.id, !c.published)}
                      className={`px-2 py-1 rounded text-xs ${
                        c.published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {c.published ? '已发布' : '草稿'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.viewCount}</td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(c.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
