import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero 区域 */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          学会 AI <span className="text-primary-600">掌握未来</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          这里是 AI 学习平台，带你从零入门 AI，掌握最前沿的人工智能工具
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/learn" 
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
          >
            开始学习
          </Link>
          <Link 
            href="/tools" 
            className="px-8 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg font-medium hover:bg-primary-50 transition"
          >
            AI 工具箱
          </Link>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">AI 教程</h3>
            <p className="text-gray-600">系统化的 AI 学习路径，从入门到进阶</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold mb-2">AI 工具</h3>
            <p className="text-gray-600">集成主流 AI 工具，在线直接使用</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">社区交流</h3>
            <p className="text-gray-600">与 AI 爱好者一起成长</p>
          </div>
        </div>
      </section>

      {/* AI 工具快捷入口 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">热门 AI 工具</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Chat 对话', icon: '💬', href: '/tools/chat' },
              { name: 'AI 绘图', icon: '🎨', href: '/tools/image' },
              { name: '代码助手', icon: '💻', href: '/tools/code' },
              { name: '文案生成', icon: '✍️', href: '/tools/write' },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="p-4 bg-white rounded-lg border hover:shadow-md transition text-center"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-medium">{tool.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
