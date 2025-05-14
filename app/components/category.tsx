'use client';
import React from 'react';
import TabBar from './tabbar';
import Breadcrumbs from './breadcrumbs';
import Showroom from './showroom';

const dummyData = {
  
  themes: [
    {
      id: '1',
      title: 'Modern UI Kit',
      image: '/images/1.png',
      author: 'John Doe',
      price: '$30',
      sales: 120,
      rating: 4,
      link:"https://elements.envato.com/photos/blanket",
       link2:"/Contact"
    },
    {
      id: '2',
      title: 'Minimalist Theme',
      image: '/images/2.png',
      author: 'Jane Smith',
      price: '$50',
      sales: 300,
      rating: 5,
      link:"https://elements.envato.com/photos/blanket",
       link2:"/Contact"
     
    },
    {
      id: '3',
      title: 'E-commerce Theme',
      image: '/images/3.png',
      author: 'Alice Brown',
      price: '$80',
      sales: 450,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
  ],
  images: [
    {
      id: '1',
      title: 'Modern UI Kit',
      image: '/images/3.png',
      author: 'John Doe',
      price: '$30',
      sales: 120,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
    {
      id: '2',
      title: 'Minimalist Theme',
      image: '/images/7.png',
      author: 'Jane Smith',
      price: '$50',
      sales: 300,
      rating: 5,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
    {
      id: '3',
      title: 'E-commerce Theme',
      image: '/images/6.png',
      author: 'Alice Brown',
      price: '$80',
      sales: 450,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
  ],
  graphics: [
    {
      id: '1',
      title: 'Modern UI Kit',
      image: '/images/4.png',
      author: 'John Doe',
      price: '$30',
      sales: 120,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
    {
      id: '2',
      title: 'Minimalist Theme',
      image: '/images/4.png',
      author: 'Jane Smith',
      price: '$50',
      sales: 300,
      rating: 5,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
    {
      id: '3',
      title: 'E-commerce Theme',
      image: '/images/4.png',
      author: 'Alice Brown',
      price: '$80',
      sales: 450,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
     link2:"/Contact"
    },
  ],
};

const breadcrumbsData = [
  { label: 'Home', link: '/' },
  { label: 'Themes', link: '/themes' },
  { label: 'Featured Theme', link: '/themes/featured' },
];

const Category = () => {
  return (
    <div>
      <TabBar />
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      
      {/* Showroom Components for different categories */}
      <Showroom
        categoryName="Themes"
        totalCategories={dummyData.themes.length}
        categoryImage="/images/4.png"
        categoryDescription="Explore various modern and minimalist themes."
        products={dummyData.themes}
       
      />
      <Showroom 
        categoryName="Images"
        totalCategories={dummyData.images.length}
        categoryImage="/images/4.png"
        categoryDescription="Browse high-quality images for your projects."
        products={dummyData.images}
        
      />
   
     
    </div>
  );
};

export default Category;
