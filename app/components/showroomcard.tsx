'use client';
import React from 'react';
import Image from 'next/image';
import GlassButton from './thbutton';  // Ensure you import the GlassButton component

type CategoryCardProps = {
  categoryImage: string;
  categoryName: string;
  categoryDescription: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryImage,
  categoryName,
  categoryDescription,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl backdrop-blur-md p-4 relative">
      {/* Image at the top */}
      <div className="w-full h-48 relative rounded-lg overflow-hidden">
        <Image
          src={categoryImage}
          alt={categoryName}
          className="object-cover"
          layout="fill" // Ensures the image covers the container
        />
      </div>

      {/* Description as the body */}
      <div className="text-sm text-gray-300">{categoryDescription}</div>

      {/* View Category Button at the bottom-right */}
      <div className="absolute bottom-4 right-4">
        <GlassButton
          text={`View ${categoryName}`}
          fill="rgba(255, 255, 255, 0)"
          stroke="rgba(255, 255, 255, 0)"
          fontSize="0.9rem" // Smaller font size
          fontWeight="400" // Lighter font weight
        />
      </div>
    </div>
  );
};

export default CategoryCard;
