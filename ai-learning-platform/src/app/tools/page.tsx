'use client'

import { useState, useEffect } from 'react'

interface Tool {
  id: string
  name: string
  nameEn: string
  description: string
  icon: string
  url: string
  category: string
  tags: string
  isPremium: boolean
  isHot: boolean
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchTools()
  }, [category])

  const fetchTools = async () => {
    setLoading(true)
    try {
      const url = category 
        ? `/api/tools?category=${category}`
        : '/api/tools'
      const res = await fetch(url)
      const data = await res.json()
      setTools(data || [])
    } catch (error) {
      console.error('获取工具失败:', error)
    }
    setLoading(false)
  }

  const categories = ['全部', '对话', '绘图', '视频', '音频', '代码', '办公']

  // 如果没有数据，显示示例数据
  const displayTools = tools.length > 0 ? tools : [
    { id: '1', name: 'ChatGPT', nameEn: 'ChatGPT', description: 'OpenAI 出品的 AI 对话助手', icon: '🤖', url: '', category: '对话', tags: '对话,AI', isPremium: false, isHot: true },
    { id: '2', name: 'Claude', nameEn: 'Claude', description: 'Anthropic 出品的 AI 助手', icon: '🧠', url: '', category: '对话', tags: '对话,AI', isPremium: false, isHot: true },
    { id: '3', name: 'Midjourney', nameEn: 'Midjourney', description: 'AI 艺术图像生成工具', icon: '🎨', url: '', category: '绘图', tags: '绘图,AI艺术', isPremium: true, isHot: true },
    { id: '4', name: 'Stable Diffusion', nameEn: 'Stable Diffusion', description: '开源 AI 图像生成模型', icon: '🖼️', url: '', category: '绘图', tags: '绘图,开源', isPremium: false, isHot: false },
    { id: '5', name: 'GitHub Copilot', nameEn: 'GitHub Copilot', description: 'AI 代码补全工具', icon: '💻', url: '', category: '代码', tags: '代码,编程', isPremium: true, isHot: true },
    { id: '6', name: '通义千问', nameEn: 'Tongyi', description: '阿里云 AI 大模型', icon: '🏮', url: '', category: '对话', tags: '对话,国产', isPremium: false, isHot: false },
    { id: '7', name: '文心一言', nameEn: 'ERNIE Bot', description: '百度 AI 对话助手', icon: '🦢', url: '', category: '对话', tags: '对话,国产', isPremium: false, isHot: false },
    { id: '8', name: 'Runway', nameEn: 'Runway', description: 'AI 视频生成与编辑平台', icon: '🎬', url: '', category: '视频', tags: '视频,AI', isPremium: true, isHot: false },
  ]

  const filteredTools = category 
    ? displayTools.filter(t => t.category === category)
    : displayTools

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI 工具箱</h1>
      
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

      {/* 工具列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
            >
              {tool.isHot && (
                <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  HOT
                </span>
              )}
              {tool.isPremium && (
                <span className="absolute top-2 right-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                  VIP
                </span>
              )}
              <div className="text-3xl mb-3">{tool.icon || '🔧'}</div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{tool.name}</h3>
                {tool.nameEn && (
                  <span className="text-xs text-gray-400">{tool.nameEn}</span>
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{tool.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {tool.tags.split(',').slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
