// page.tsx (main page file)
import React, { Suspense } from 'react'
import CategoryPage from './main'
import Header from '../components/header'

// Loading component for the suspense boundary
const CategoryPageSkeleton = () => {
  return (
    <div className="min-h-screen text-white px-6 py-8">
      <div className="mb-6">
        <div className="flex gap-4 text-sm font-medium text-gray-400">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-96 bg-gray-700 rounded animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-64 bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <div className=''>
      <Header/>
      <div className='mt-30'>
        <Suspense fallback={<CategoryPageSkeleton />}>
          <CategoryPage/>  
        </Suspense>
      </div>
    </div>
  )
}

export default Page