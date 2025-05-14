'use client';
import React from 'react';
import { FiDownload, FiBookmark, FiHeart } from 'react-icons/fi';
import GlassButton from './thbutton';

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  author: string;
  price: string;
  sales: number;
  rating: number; // rating value out of 5
  link:string;
  link2:string
   
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  author,
  price,
  sales,
  rating,
  link,
  link2,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col hover:scale-105 transition-all duration-300 ease-in-out">
      {/* Head (Star Rating + Icons) */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1 text-yellow-400">
          {/* Star Rating */}
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}>
              ★
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-white">
          {/* Icons */}
          <FiDownload size={20} />
          <FiBookmark size={20} />
          <FiHeart size={20} />
        </div>
      </div>

      {/* Body (Image, Title, Author, Price, Sales) */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl mb-2" />
        
        {/* Title and Author */}
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="text-sm text-white/70">{author}</div>
        
        {/* Price and Sales */}
        <div className="flex justify-between text-sm text-white mt-2">
          <div className="font-medium">{price}</div>
          <div className="text-white/70">Sales: {sales}</div>
        </div>
      </div>

      {/* Tail (Buttons) */}
      <div className="flex gap-4 mt-4">
       
        <GlassButton text="View Live" icon={<FiHeart />} link={link} />
        <GlassButton text="Contact Me" icon={<FiDownload />} link={link2}  />
      </div>
    </div>
  );
};

export default ProductCard;
