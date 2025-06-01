// Alternative: If you prefer client-side navigation with useRouter
// app/category/[type]/page.tsx (Client-side navigation version)

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product, coffeeData } from '@/lib/coffeedata';
import ProductCard from '../../components/card';
import Header from '../../components/header';

const categories = [
  { label: 'Hot Drinks', key: 'hotDrinks' },
  { label: 'Cold Drinks', key: 'coldDrinks' },
  { label: 'Frappe', key: 'frappe' },
  { label: 'Soda', key: 'soda' },
];

const descriptions: Record<string, string> = {
  hotDrinks: 'Warm and cozy selections to comfort your day.',
  coldDrinks: 'Chilled beverages perfect for a hot afternoon.',
  frappe: 'Creamy, blended, and irresistibly indulgent treats.',
  soda: 'Sparkling and refreshing with a fizzy kick.',
};

type CategoryKey = keyof typeof coffeeData;

interface PageProps {
  params: {
    type: string;
  };
}

const CategoryContent = ({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: CategoryKey;
  onCategoryChange: (key: CategoryKey) => void;
}) => {
  const title = categories.find(c => c.key === activeCategory)?.label || '';
  const description = descriptions[activeCategory];

  return (
    <div className="min-h-screen text-white px-6 py-8">
      {/* Breadcrumb-like Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 text-sm font-medium text-gray-400">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key as CategoryKey)}
              className={`hover:text-white transition-colors ${
                activeCategory === cat.key ? 'text-white underline' : ''
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>
        <p className="text-gray-400 max-w-xl">{description}</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coffeeData[activeCategory]?.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

const CategoryPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { type } = params;

  // Check if the category type is valid, redirect if not
  if (!Object.keys(coffeeData).includes(type)) {
    router.replace('/category/hotDrinks');
    return null;
  }

  const activeCategory = type as CategoryKey;

  const handleCategoryChange = (key: CategoryKey) => {
    router.push(`/category/${key}`);
  };

  return (
    <div>
      <Header />
      <div className="mt-30">
        <CategoryContent 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default CategoryPage;