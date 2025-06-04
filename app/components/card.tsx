'use client';

import {
  FiDownload,
  FiBookmark,
  FiHeart,
  FiEye,
  FiX,
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
  badge?:boolean
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
  badge,
}) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
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
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
         className="relative bg-background/20 bg-yellow-100/10 backdrop-blur-md rounded-2xl p-4 flex flex-col hover:scale-105 transition-all duration-300 ease-in-out shadow-md"

      >
        {/* Rating and Icons */}
        <div className="flex justify-between items-start text-accent">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index < rating ? 'text-accent' : 'text-muted'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <div className="flex gap-3 text-foreground/80">
            <FiDownload size={20} />
            <FiBookmark size={20} />
            <FiHeart size={20} />
          </div>
        </div>

        {/* Media */}
        <div className="flex flex-col gap-2 mt-4 relative">
          {isVideo ? (
            <video
              ref={videoRef}
              src={media}
              controls
              muted
              className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-xl mb-2"
            />
          ) : (
                     <div className="relative">
  <Image
    src={media}
    alt={title}
    width={500}
    height={300}
    className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-xl mb-2"
    style={{ width: '100%', height: 'auto' }}
  />

  {/* ✅ Show badge only when badge prop is true */}
  {badge && (
    <div className=" absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow-md uppercase font-bold z-10">
      SOLD OUT
    </div>
  )}

  {isHovered && (
    <button
      onClick={() => setIsModalOpen(true)}
      className="absolute top-2 right-2 bg-black/30 text-white p-2 rounded-full hover:bg-white hover:text-background transition"
    >
      <FiEye size={18} />
    </button>
  )}

  <p className="absolute left-0 w-full text-center text-xs italic text-yellow-600 mt-1 top-[calc(87%+5px)]">
    *Actual orders may look different from the images shown. We serve using standard coffee cups and Clear PET Cups.
  </p>
</div>


          )}

          {/* Title & Meta */}
          <div className="font-nickysans text-lg sm:text-xl font-semibold text-foreground">
            {title}
          </div>
          <div className="text-sm text-foreground/60 font-light">{author}</div>
          

          {/* Price & Sales */}
          <div className="flex justify-between text-sm sm:text-base mt-2 font-nickysans">
            <div className="text-xl font-bold text-accent">{price}</div>
            <div className="text-foreground/60">Sales: {sales}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <GlassButton text="Like" icon={<FiHeart />} />
          <GlassButton
            text="Place Order"
            icon={<FiDownload />}
            link={`/checkout/${id}`}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="relative w-[80vw] h-[80vh] rounded-xl overflow-hidden shadow-xl bg-background border border-foreground/20">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-background bg-foreground p-2 rounded-full hover:bg-accent hover:text-background transition"
            >
              <FiX size={20} />
            </button>

            {splineLink ? (
              <Spline scene={splineLink} />
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
