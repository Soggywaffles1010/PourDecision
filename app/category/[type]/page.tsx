import React from 'react';
import { Product, coffeeData } from '@/lib/coffeedata';
import ProductCard from '../../components/card';
import Header from '../../components/header';
import { notFound } from 'next/navigation';

const categories = [
  { label: 'Hot Drinks', key: 'hotDrinks' },
  { label: 'Cold Drinks', key: 'coldDrinks' },
  { label: 'Frappe', key: 'frappe' },
  { label: 'Soda', key: 'soda' },
  { label: 'Pastries', key: 'pastries' },  // Added Pastries category here
];

const descriptions: Record<string, string> = {
  hotDrinks: 'Warm and cozy selections to comfort your day.',
  coldDrinks: 'Chilled beverages perfect for a hot afternoon.',
  frappe: 'Creamy, blended, and irresistibly indulgent treats.',
  soda: 'Sparkling and refreshing with a fizzy kick.',
  pastries: 'Freshly baked delights to satisfy your sweet tooth.',  // Added description for pastries
};

type CategoryKey = keyof typeof coffeeData;

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const CategoryContent = ({ activeCategory }: { activeCategory: CategoryKey }) => {
  const title = categories.find(c => c.key === activeCategory)?.label || '';
  const description = descriptions[activeCategory];

  return (
    <div className="min-h-screen px-6 py-10 font-nickysans text-foreground">
      {/* Tab Nav */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`/category/${cat.key}`}
              className={`px-3 py-1 rounded-xl transition-all duration-200
                ${
                  activeCategory === cat.key
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground/60 hover:text-accent hover:bg-accent/10'
                }
              `}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* Heading */}
      <div className="mb-10 text-accent">
        <h1 className="text-3xl font-semibold mb-1">{title}</h1>
        <p className="text-sm max-w-xl text-foreground/80">{description}</p>
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

const CategoryPage = async ({ params }: PageProps) => {
  const { type } = await params;

  if (!Object.keys(coffeeData).includes(type)) {
    notFound();
  }

  const activeCategory = type as CategoryKey;

  return (
    <div>
      <Header />
      <div className="mt-20">
        <CategoryContent activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
