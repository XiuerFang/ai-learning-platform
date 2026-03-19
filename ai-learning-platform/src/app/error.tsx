'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">出错了</h1>
        <p className="text-gray-500 mb-8">抱歉，发生了错误</p>
        <button
          onClick={() => reset()}
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          重试
        </button>
      </div>
    </div>
  )
}
