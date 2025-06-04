'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai'; // Filled heart for "liked"

type GlassButtonProps = {
  text: string;
  icon?: React.ReactNode;
  fill?: string;
  stroke?: string;
  delay?: number;
  fontSize?: string;
  fontWeight?: string;
  onClick?: () => void;
  link?: string;
  className?: string;
  liked?: boolean; // ✅ New prop
};

const GlassButton: React.FC<GlassButtonProps> = ({
  text,
  icon,
  fill,
  stroke,
  delay = 0,
  fontSize,
  fontWeight = '500',
  onClick,
  link,
  className,
  liked = false,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const baseStyles = `
    flex items-center justify-center
    px-4 py-2 sm:px-6 sm:py-3
    rounded-xl text-sm sm:text-base md:text-lg
    backdrop-blur-md border transition-all duration-300 ease-in-out
    font-medium text-foreground border-foreground
    hover:bg-accent hover:text-background
    hover:scale-105 gap-2
    ${showButton ? 'opacity-100' : 'opacity-0'}
    ${className || ''}
  `;

  const defaultIcon = liked ? (
    <AiFillHeart size={18} className="text-red-500" />
  ) : (
    <FiHeart size={18} className="text-foreground" />
  );

  const content = (
    <span className="flex items-center justify-center gap-2 w-full">
      <span className="flex items-center">{icon ?? defaultIcon}</span>
      <span className="flex items-center leading-none pt-1">{text}</span>
    </span>
  );

  if (link) {
    return (
      <Link href={link} className={`w-full sm:w-auto ${baseStyles}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {content}
    </button>
  );
};

export default GlassButton;
