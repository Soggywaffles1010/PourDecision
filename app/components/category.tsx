'use client';
import React from 'react';
import TabBar from './tabbar';
// import Breadcrumbs from './breadcrumbs'; // Uncomment if using breadcrumbs
 
  import { coffeeData } from '@/lib/coffeedata';
import Showroom from './showroom';

const breadcrumbsData = [
  { label: 'Home', link: '/' },
  { label: 'hotDrinks', link: '/hotDrinks' },
  { label: 'Featured Theme', link: '/hotDrinks/featured' },
];

const Category = () => {
  return (
    <div>
      <TabBar />
      {/* <Breadcrumbs breadcrumbs={breadcrumbsData} /> */}

      <Showroom
        categoryName="Hot Drinks"
        totalCategories={coffeeData.hotDrinks.length}
        categoryImage="/images/8.png"
        categoryDescription="Explore various modern and minimalist hot drinks."
        products={coffeeData.hotDrinks}
      />

      <Showroom 
        categoryName="Cold Drinks"
        totalCategories={coffeeData.coldDrinks.length}
        categoryImage="/images/4.png"
        categoryDescription="Browse high-quality images for your projects."
        products={coffeeData.coldDrinks}
      />

      <Showroom 
        categoryName="Frappe"
        totalCategories={coffeeData.frappe.length}
        categoryImage="/images/6.png"
        categoryDescription="Delicious cold and blended coffee beverages."
        products={coffeeData.frappe}
      />
          <Showroom 
        categoryName="Soda"
        totalCategories={coffeeData.soda.length}
        categoryImage="/images/6.png"
        categoryDescription="Delicious cold and blended coffee beverages."
        products={coffeeData.soda}
      />
    </div>
  );
};

export default Category;
