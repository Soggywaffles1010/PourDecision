'use client';
import React from 'react';
import GlassButton from './thbutton';
import ProductCard from './card';
 
import CategoryCard from './showroomcard';

type ShowroomProps = {
  categoryName: string;
  totalCategories: number;
  categoryImage: string;
  categoryDescription: string;
  products: any[]; // The product data for the cards (could be an array of product objects)

};

const Showroom: React.FC<ShowroomProps> = ({
  categoryName,
  totalCategories,
  categoryImage,
  categoryDescription,
  products,
 
 
}) => {
  return (
    <div className="mx-[50px] my-6 ">
       
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          {categoryName} ({totalCategories})
        </div>
        <GlassButton
  text="View More"
  fill="rgba(255, 255, 255, 0)"
  stroke="rgba(255, 255, 255, 0)"
  fontSize="0.9rem" // Smaller font size
  fontWeight="400" // Lighter font weight
  
/>

      </div>

      <div className="grid grid-cols-4 gap-5">
        {/* First Column: Category Image and Description */}
          
        <CategoryCard
  categoryImage={categoryImage}
  categoryName={categoryName}
  categoryDescription={categoryDescription}
/>
        {/* Other 3 Columns: Product Cards */}
        {products.map((product, index) => (
  <ProductCard 
    key={index}
    id={product.id}
    image={product.image}
    title={product.title}
    author={product.author}
    price={product.price}
    sales={product.sales}
    rating={product.rating}
   link={product.link}
   link2={product.link2}
  />
))}

      </div>
    </div>
  );
};

export default Showroom;
