'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

interface Post {
  id: string
  title: string
  content: string
  tags: string
  viewCount: number
  likes: number
  createdAt: string
  author: {
    id: string
    name: string
    avatar: string
  }
  _count: {
    comments: number
  }
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user, token } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/community/posts')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('获取帖子失败:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      alert('请先登录')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, tags })
      })

      if (res.ok) {
        setShowForm(false)
        setTitle('')
        setContent('')
        setTags('')
        fetchPosts()
      } else {
        alert('发布失败')
      }
    } catch (error) {
      console.error('发布帖子失败:', error)
      alert('发布失败')
    }
    setSubmitting(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">社区</h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {showForm ? '取消' : '发布帖子'}
          </button>
        )}
      </div>

      {/* 发布表单 */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">发布新帖子</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">标签 (用逗号分隔)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="AI, 学习, 交流"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
            >
              {submitting ? '发布中...' : '发布'}
            </button>
          </div>
        </form>
      )}

      {/* 帖子列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">暂无帖子</p>
          {user && (
            <button
              onClick={() => setShowForm(true)}
              className="text-primary-600 hover:underline"
            >
              发布第一个帖子
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block bg-white border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {post.author?.name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{post.author?.name || '匿名'}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                    <span>•</span>
                    <span>{post.viewCount} 阅读</span>
                    <span>•</span>
                    <span>{post._count?.comments || 0} 评论</span>
                  </div>
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.split(',').map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
