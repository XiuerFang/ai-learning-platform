'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar: string
  }
}

export default function PostPage() {
  const params = useParams()
  const { user, token } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string)
    }
  }, [params.id])

  const fetchPost = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/community/posts/${id}`)
      if (res.ok) {
        const data = await res.json()
        setPost(data)
      }
    } catch (error) {
      console.error('获取帖子失败:', error)
    }
    setLoading(false)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !comment.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/community/posts/${post?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: comment })
      })

      if (res.ok) {
        setComment('')
        fetchPost(post!.id)
      }
    } catch (error) {
      console.error('评论失败:', error)
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">帖子不存在</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 帖子内容 */}
      <article className="bg-white border rounded-lg p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              {post.author?.name?.[0] || '?'}
            </div>
            <span>{post.author?.name || '匿名'}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleString('zh-CN')}</span>
          <span>•</span>
          <span>{post.viewCount} 阅读</span>
        </div>

        <div className="prose max-w-none whitespace-pre-wrap mb-6">
          {post.content}
        </div>

        {post.tags && (
          <div className="flex flex-wrap gap-2 pt-6 border-t">
            {post.tags.split(',').map((tag, i) => (
              <span key={i} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* 评论列表 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          评论 ({post.comments?.length || 0})
        </h2>

        {post.comments?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暂无评论</p>
        ) : (
          <div className="space-y-4">
            {post.comments?.map((c) => (
              <div key={c.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {c.author?.name?.[0] || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{c.author?.name || '匿名'}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <p className="text-gray-700">{c.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 评论表单 */}
      {user ? (
        <form onSubmit={handleComment} className="bg-white border rounded-lg p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="写下你的评论..."
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 mb-3"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {submitting ? '发送中...' : '发表评论'}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 border rounded-lg p-4 text-center">
          <p className="text-gray-500">
            <a href="/login" className="text-primary-600 hover:underline">登录</a> 后发表评论
          </p>
        </div>
      )}
    </div>
  )
}
