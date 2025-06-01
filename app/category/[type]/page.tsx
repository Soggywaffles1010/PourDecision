// app/category/[type]/page.tsx
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
];

const descriptions: Record<string, string> = {
  hotDrinks: 'Warm and cozy selections to comfort your day.',
  coldDrinks: 'Chilled beverages perfect for a hot afternoon.',
  frappe: 'Creamy, blended, and irresistibly indulgent treats.',
  soda: 'Sparkling and refreshing with a fizzy kick.',
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
    <div className="min-h-screen text-yello-700 px-6 py-8">
      {/* Breadcrumb-like Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 text-sm font-medium text-yellow-700">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`/category/${cat.key}`}
              className={`hover:text-yellow-50 transition-colors ${
                activeCategory === cat.key ? 'text-yellow-50 underline' : ''
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 text-yellow-900">
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>
        <p className=" max-w-xl">{description}</p>
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
  // Await the params since it's now a Promise in Next.js 15+
  const { type } = await params;

  // Check if the category type is valid
  if (!Object.keys(coffeeData).includes(type)) {
    notFound(); // This will show a 404 page
  }

  const activeCategory = type as CategoryKey;

  return (
    <div>
      <Header />
      <div className="mt-30">
        <CategoryContent activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;