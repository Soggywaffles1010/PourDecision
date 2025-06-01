// main.tsx (CategoryPage component)
'use client';

import { useEffect, useState } from 'react';
import { Product, coffeeData } from '@/lib/coffeedata';
import ProductCard from '../components/card';
import { useSearchParams, useRouter } from 'next/navigation';

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

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('hotDrinks');

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && Object.keys(coffeeData).includes(typeParam)) {
      setActiveCategory(typeParam as CategoryKey);
    }
  }, [searchParams]);

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
    router.push(`/category?type=${key}`);
  };

  const title = categories.find(c => c.key === activeCategory)?.label || '';
  const description = descriptions[activeCategory];

  return (
    <div className="min-h-screen text-white px-6 py-8">
      {/* Breadcrumb-like Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 text-sm font-medium text-gray-400">
          {categories.map((cat, index) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key as CategoryKey)}
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

export default CategoryPage;