import React from 'react'
import CategoryPage from './main'
import Header from '../components/header'
import { Suspense } from 'react';

const page = () => {
  return (
    <div className=''>
            <Header/>
            <div className='mt-30'>
                      <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <CategoryPage />
    </Suspense>
            </div>
            
    </div>
  )
}

export default page