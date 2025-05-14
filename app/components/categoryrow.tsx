import React from 'react';
import ProductCard from './card';
 

type ProductCard = {
  id: string;
  title: string;
  image: string;
  author: string;
  price: string;
  sales: number;
  rating: number;
  
};

type CategoryRowProps = {
  title: string;
  products: ProductCard[];
};

const CategoryRow: React.FC<CategoryRowProps> = ({ title, products }) => {
  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/70">1 / 3</div>
          <a href="#" className="text-sm text-blue-400 hover:underline">
            View More
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            author={product.author}
            price={product.price}
            sales={product.sales}
            rating={product.rating}
            link='https://elements.envato.com/photos/blanket'
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
