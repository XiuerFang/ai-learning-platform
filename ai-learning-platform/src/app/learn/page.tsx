'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Content {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string
  viewCount: number
  createdAt: string
}

export default function LearnPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchContents()
  }, [category])

  const fetchContents = async () => {
    setLoading(true)
    try {
      const url = category 
        ? `/api/contents?category=${category}&published=true`
        : '/api/contents?published=true'
      const res = await fetch(url)
      const data = await res.json()
      setContents(data.contents || [])
    } catch (error) {
      console.error('获取内容失败:', error)
    }
    setLoading(false)
  }

  const categories = ['全部', '入门', '进阶', ' Prompt', '工具', '案例']

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI 学习中心</h1>
      
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === '全部' ? '' : cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              (cat === '全部' && !category) || category === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 内容列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : contents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">暂无内容</p>
          <Link href="/learn/new" className="text-primary-600 hover:underline">
            撰写第一篇文章
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <Link
              key={content.id}
              href={`/learn/${content.slug}`}
              className="block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {content.description && (
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {content.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {content.viewCount} 阅读
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {content.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {content.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
