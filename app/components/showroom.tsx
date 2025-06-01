'use client';
import React, { useEffect, useState } from 'react';
import GlassButton from './thbutton';
import ProductCard from './card';

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
  gridClassName,
}) => {
  const [maxCards, setMaxCards] = useState(1); // default to 1 for small screens

  useEffect(() => {
    const updateCardLimit = () => {
      if (window.innerWidth >= 1024) {
        setMaxCards(4); // large
      } else if (window.innerWidth >= 768) {
        setMaxCards(3); // medium
      } else {
        setMaxCards(1); // small
      }
    };

    updateCardLimit();
    window.addEventListener('resize', updateCardLimit);
    return () => window.removeEventListener('resize', updateCardLimit);
  }, []);

  return (
    <div className="mx-[50px] my-6 overflow-hidden">
      <div className="flex-row flex justify-between gap-5 mb-4 ">
        <div className="text-xl font-semibold ">
          {categoryName} ({totalCategories})
        </div>
        <GlassButton
          text="View More"
          fill="rgba(255, 255, 255, 0)"
          stroke="rgba(255, 255, 255, 0)"
          fontSize="0.9rem"
          fontWeight="400"
        />
      </div>

      <div className={gridClassName || 'grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'}>
        {products.slice(0, maxCards).map((product) => (
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
