'use client';

import {
  FiDownload,
  FiBookmark,
  FiHeart,
  FiZoomIn,
  FiX,
  FiEye,
} from 'react-icons/fi';
import GlassButton from './thbutton';
import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';


type ProductCardProps = {
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

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  media,
  title,
  author,
  price,
  sales,
  rating,
  link,
  link2,
  splineLink,
}) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
   const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(media);
  const isSpline = media.startsWith('https://prod.spline.design/') || media.endsWith('.splinecode');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      {/* Product Card */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col  hover:scale-105 transition-all duration-300 ease-in-out"
      >
        {/* Head */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index < rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-yellow-900">
            <FiDownload size={20} />
            <FiBookmark size={20} />
            <FiHeart size={20} />
          </div>
        </div>

       {/* Body */}
<div className="flex flex-col gap-2 mt-4 relative">
  {isVideo ? (
    <video
      ref={videoRef}
      src={media}
      controls
      muted
      className="w-full h-44 sm:h-48 md:h-52 object-cover object-center rounded-xl mb-2"
    />
  ) : (
    <div className="relative">
      <Image
  src={media}
  alt={title}
  width={500} // or adjust as needed
  height={300}
  className="w-full h-44 sm:h-48 md:h-52 object-cover object-center rounded-xl mb-2"
  style={{ width: '100%', height: 'auto' }}
  priority={false}
/>

      {isHovered && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-2 bg-black/20 p-2 rounded-full text-white hover:bg-white/80 transition"
        >
          <FiEye size={18} />
        </button>
      )}
    </div>
  )}

  {/* Title & Author */}
  <div className="text-base sm:text-lg font-semibold text-yellow-900">{title}</div>
  <div className="text-xs sm:text-sm text-yellow-700/70">{author}</div>

  {/* Price & Sales */}
  <div className="flex justify-between text-xs sm:text-sm mt-2">
    <div className="text-lg sm:text-xl text-yellow-900 font-extrabold">{price}</div>
    <div className="text-yellow-700/70">Sales: {sales}</div>
  </div>
</div>


        {/* Tail Buttons */}
        <div className="flex gap-4 mt-4">
          <GlassButton text="Like" icon={<FiHeart />} link={""} />
          <GlassButton
  text="Place Order"
  icon={<FiDownload />}
  link={`/checkout/${id}`}
/>

        </div>
      </div>

      {/* Modal */}
        {isModalOpen && (
  <div className="fixed inset-0 bg-black/50  backdrop-blur-sm z-50 flex justify-center items-center">
    <div className="relative w-[80vw] h-[80vh]  rounded-xl overflow-hidden shadow-lg ">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 z-10 text-black bg-white p-2 rounded-full"
      >
        <FiX size={20} />
      </button>
   
     
      
 

      {splineLink ? (
         <Spline
        scene="" 
      />
      ) : isVideo ? (
        <video
          src={media}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={media}
          alt={title}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  </div>
)}

    </>
  );
};

export default ProductCard;
