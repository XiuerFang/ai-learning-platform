import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">页面不存在</h2>
        <p className="text-gray-500 mt-2 mb-8">抱歉，您访问的页面不存在</p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
