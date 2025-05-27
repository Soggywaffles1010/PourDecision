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
  media: '/images/1.png',
  author: 'John Doe',
  price: '$30',
  sales: 120,
  rating: 4,
  link:"https://elements.envato.com/photos/blanket",
  link2:"/Contact",
  
},

    {
      id: '2',
      title: 'Minimalist Theme',
      media: '/images/2.png',
      author: 'Jane Smith',
      price: '$50',
      sales: 300,
      rating: 5,
      link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact",
      splineLink:"https://prod.spline.design/2ah5ZzyFJ3rqD8DR/scene.splinecode"
     
    },
    {
      id: '3',
      title: 'E-commerce Theme',
      media: '/images/3.png',
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
      media: '/images/3.png',
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
      media: '/images/7.png',
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
      media: '/images/6.png',
      author: 'Alice Brown',
      price: '$80',
      sales: 450,
      rating: 4,
     link:"https://elements.envato.com/photos/blanket",
      link2:"/Contact"
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Modern UI Kit',
      media: '/videos/1.mp4',
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
      media: '/videos/2.mp4',
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
      media: '/videos/3.mp4',
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
        categoryName="Web Design"
        totalCategories={dummyData.themes.length}
        categoryImage="/images/4.png"
        categoryDescription="Explore various modern and minimalist themes."
        products={dummyData.themes}
      />

      <Showroom 
        categoryName="Graphic Designs"
        totalCategories={dummyData.graphics.length}
        categoryImage="/images/4.png"
        categoryDescription="Browse high-quality images for your projects."
        products={dummyData.graphics}
        gridClassName="flex-row-reverse flex justify-center gap-5"
        
      />
       <Showroom 
        categoryName="Videos"
        totalCategories={dummyData.videos.length}
        categoryImage="/images/6.png"
        categoryDescription="Browse high-quality images for your projects."
        products={dummyData.videos}
       
        
      />
      
   
     
    </div>
  );
};

export default Category;
