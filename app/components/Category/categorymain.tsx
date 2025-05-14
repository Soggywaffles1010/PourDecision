import React from 'react'
import FilterColumn from '../filtercolumn'
import CategoryRow from '../categoryrow'

const dummyData = {
    themes: [
      {
        id: '1',
        title: 'Modern UI Kit',
        image: '/images/product1.jpg', // Use the correct path to your image
        author: 'John Doe',
        price: '$30',
        sales: 120,
        rating: 4,
      },
      {
        id: '2',
        title: 'Minimalist Theme',
        image: '/images/product2.jpg',
        author: 'Jane Smith',
        price: '$50',
        sales: 300,
        rating: 5,
      },
      {
        id: '3',
        title: 'E-commerce Theme',
        image: '/images/product3.jpg',
        author: 'Alice Brown',
        price: '$80',
        sales: 450,
        rating: 4,
      },
      
    ],
    images: [
        {
            id: '1',
            title: 'Modern UI Kit',
            image: '/images/product1.jpg', // Use the correct path to your image
            author: 'John Doe',
            price: '$30',
            sales: 120,
            rating: 4,
          },
          {
            id: '2',
            title: 'Minimalist Theme',
            image: '/images/product2.jpg',
            author: 'Jane Smith',
            price: '$50',
            sales: 300,
            rating: 5,
          },
          {
            id: '3',
            title: 'E-commerce Theme',
            image: '/images/product3.jpg',
            author: 'Alice Brown',
            price: '$80',
            sales: 450,
            rating: 4,
          },
    ],
    graphics: [
        {
            id: '1',
            title: 'Modern UI Kit',
            image: '/images/product1.jpg', // Use the correct path to your image
            author: 'John Doe',
            price: '$30',
            sales: 120,
            rating: 4,
          },
          {
            id: '2',
            title: 'Minimalist Theme',
            image: '/images/product2.jpg',
            author: 'Jane Smith',
            price: '$50',
            sales: 300,
            rating: 5,
          },
          {
            id: '3',
            title: 'E-commerce Theme',
            image: '/images/product3.jpg',
            author: 'Alice Brown',
            price: '$80',
            sales: 450,
            rating: 4,
          },
    ],
  };
  const dummyFilters = [
    { id: '1', name: 'Free', count: 50 },
    { id: '2', name: 'Paid', count: 30 },
    { id: '3', name: 'Premium', count: 10 },
  ];

  const handleApplyFilters = () => {
    console.log('Filters applied');
    // Logic for applying filters
  };

const categorymain = () => {
  return (
    <div className="grid grid-cols-4 gap-[20px] mx-[50px] mt-16"> 
    <FilterColumn title="Categories" filters={dummyFilters} onApplyFilters={handleApplyFilters} />
   <div className="col-span-3 space-y-12">
    <CategoryRow title="Themes" products={dummyData.themes} />
    <CategoryRow title="Images" products={dummyData.images} />
    <CategoryRow title="Graphics" products={dummyData.graphics} />
   </div>
    
  </div>
  )
}

export default categorymain