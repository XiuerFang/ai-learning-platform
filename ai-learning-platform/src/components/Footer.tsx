import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🤖</span>
              <span className="font-bold text-white">AI 学习平台</span>
            </div>
            <p className="text-sm">让每个人都能学会 AI</p>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="font-semibold text-white mb-4">学习</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn/basics" className="hover:text-white">入门指南</Link></li>
              <li><Link href="/learn/advanced" className="hover:text-white">进阶教程</Link></li>
              <li><Link href="/learn/prompts" className="hover:text-white">提示词工程</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">工具</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/chat" className="hover:text-white">AI 对话</Link></li>
              <li><Link href="/tools/image" className="hover:text-white">AI 绘图</Link></li>
              <li><Link href="/tools/code" className="hover:text-white">代码助手</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">关于</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-white">联系我们</Link></li>
              <li><Link href="/privacy" className="hover:text-white">隐私政策</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          © 2024 AI 学习平台. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
