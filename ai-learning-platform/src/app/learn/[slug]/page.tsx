'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface Content {
  id: string
  title: string
  content: string
  description: string
  category: string
  tags: string
  authorName: string
  viewCount: number
  createdAt: string
}

export default function ContentPage() {
  const params = useParams()
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      fetchContent(params.slug as string)
    }
  }, [params.slug])

  const fetchContent = async (slug: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/contents/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setContent(data)
      }
    } catch (error) {
      console.error('获取内容失败:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">内容不存在</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        {/* 头部信息 */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
              {content.category}
            </span>
            <span className="text-xs text-gray-400">
              {content.viewCount} 阅读
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>作者: {content.authorName}</span>
            <span>•</span>
            <span>{new Date(content.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </header>

        {/* 正文内容 */}
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">{content.content}</div>
        </div>

        {/* 标签 */}
        {content.tags && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {content.tags.split(',').map((tag, i) => (
                <span key={i} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
