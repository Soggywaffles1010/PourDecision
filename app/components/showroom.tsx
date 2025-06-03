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
  const [maxCards, setMaxCards] = useState(1);

  useEffect(() => {
    const updateCardLimit = () => {
      if (window.innerWidth >= 1024) {
        setMaxCards(4);
      } else if (window.innerWidth >= 768) {
        setMaxCards(3);
      } else {
        setMaxCards(1);
      }
    };

    updateCardLimit();
    window.addEventListener('resize', updateCardLimit);
    return () => window.removeEventListener('resize', updateCardLimit);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 overflow-hidden bg-background/5 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="font-nickysans text-xl sm:text-2xl font-semibold text-foreground">
          {categoryName} <span className="text-accent">({totalCategories})</span>
        </div>
        <GlassButton
          text="View More"
          fill="transparent"
          stroke="transparent"
          fontSize="0.9rem"
          fontWeight="400"
        />
      </div>

      {/* Category Description (Optional) */}
      {categoryDescription && (
        <p className="text-sm text-foreground/60 mb-4 font-light max-w-2xl">
          {categoryDescription}
        </p>
      )}

      {/* Product Grid */}
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
