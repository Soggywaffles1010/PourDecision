import React from 'react'
import CategoryPage from './main'
import Header from '../components/header'


const page = () => {
  return (
    <div className=''>
            <Header/>
            <div className='mt-30'>
                     <CategoryPage/>  
            </div>
            
    </div>
  )
}

export default page