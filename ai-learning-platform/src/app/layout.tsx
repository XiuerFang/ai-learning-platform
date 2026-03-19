import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'AI 学习平台 - 学会AI，使用AI',
    template: '%s | AI学习平台'
  },
  description: 'AI学习平台，提供AI教程、AI工具导航和社区交流，从入门到进阶系统学习人工智能知识',
  keywords: 'AI学习,人工智能,AI教程,ChatGPT,AI工具,机器学习,深度学习',
  authors: [{ name: 'AI学习平台' }],
  openGraph: {
    title: 'AI学习平台 - 学会AI，掌握未来',
    description: '从入门到进阶，系统学习人工智能知识',
    url: 'http://106.54.45.113:3000',
    siteName: 'AI学习平台',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
