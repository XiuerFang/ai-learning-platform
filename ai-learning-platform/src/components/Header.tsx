'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export function Header() {
  const { user, logout, loading } = useAuth()

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="font-bold text-xl">AI 学习平台</span>
        </Link>

        {/* PC 导航 */}
        <nav className="pc-only flex items-center gap-8">
          <Link href="/learn" className="text-gray-600 hover:text-primary-600">学习</Link>
          <Link href="/tools" className="text-gray-600 hover:text-primary-600">工具</Link>
          <Link href="/community" className="text-gray-600 hover:text-primary-600">社区</Link>
          <Link href="/about" className="text-gray-600 hover:text-primary-600">关于</Link>
        </nav>

        {/* 用户区域 */}
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-gray-400">加载中...</span>
          ) : user ? (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-primary-600">
                {user.name || user.email}
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-primary-600 text-sm"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-primary-600">
                登录
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 移动端底部导航 */}
      <nav className="mobile-only fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50">
        <Link href="/learn" className="flex flex-col items-center text-xs text-gray-600">
          <span className="text-xl">📚</span>
          <span>学习</span>
        </Link>
        <Link href="/tools" className="flex flex-col items-center text-xs text-gray-600">
          <span className="text-xl">🛠️</span>
          <span>工具</span>
        </Link>
        <Link href="/community" className="flex flex-col items-center text-xs text-gray-600">
          <span className="text-xl">👥</span>
          <span>社区</span>
        </Link>
        <Link href={user ? "/profile" : "/login"} className="flex flex-col items-center text-xs text-gray-600">
          <span className="text-xl">👤</span>
          <span>我的</span>
        </Link>
      </nav>
    </header>
  )
}
