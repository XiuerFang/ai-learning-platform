export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">加载中...</p>
      </div>
    </div>
  )
}
