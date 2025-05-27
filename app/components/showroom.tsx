'use client';
import React from 'react';
import GlassButton from './thbutton';
import ProductCard from './card';
 
import CategoryCard from './showroomcard';
type Product = {
  id: string;
  media: string;
  title: string;
  author: string;
  price: string;
  sales: number;
  rating: number;
  link: string;
  link2: string;
  splineLink?: string;
 
};

type ShowroomProps = {
  categoryName: string;
  totalCategories: number;
  categoryImage: string;
  categoryDescription: string;
  products: Product[];
  gridClassName?: string;
};

const Showroom: React.FC<ShowroomProps> = ({
  categoryName,
  totalCategories,
  categoryImage,
  categoryDescription,
  products,
  gridClassName

 
 
}) => {
  return (
    <div className="mx-[50px] my-6  ">
       
      <div className="flex-row flex justify-between gap-5 mb-4 mx-[140px] ">
        <div className="text-xl font-semibold ml-[24px] ">
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

      <div className={gridClassName || 'flex-row flex justify-center gap-5'}>

        {/* First Column: Category Image and Description */}
          
        <CategoryCard
  categoryImage={categoryImage}
  categoryName={categoryName}
  categoryDescription={categoryDescription}
/>
        {/* Other 3 Columns: Product Cards */}
        {products.map((product, index) => (
  <ProductCard 
    key={product.id}
    id={product.id}
    media={product.media}
    title={product.title}
    author={product.author}
    price={product.price}
    sales={product.sales}
    rating={product.rating}
   link={product.link}
   link2={product.link2}
   splineLink={product.splineLink}
  />
))}

      </div>
    </div>
  );
};

export default Showroom;
