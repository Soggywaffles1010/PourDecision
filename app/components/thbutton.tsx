'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

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
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const buttonContent = (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 
        px-4 py-2 sm:px-6 sm:py-3 rounded-xl 
        backdrop-blur-md border text-yellow-700
        font-medium transition-all duration-300 ease-in-out
        ${showButton ? 'opacity-100' : 'opacity-0'} 
        hover:scale-105 hover:bg-white/20 
        text-sm sm:text-base md:text-lg w-full sm:w-auto text-center
      `}
      style={{
        backgroundColor: fill || 'rgba(255, 255, 255, 0.15)',
        borderColor: stroke || 'rgba(255, 255, 255, 0.3)',
        borderWidth: '1px',
        fontWeight,
        ...(fontSize ? { fontSize } : {}),
      }}
    >
      {icon && <span>{icon}</span>}
      {text}
      {!icon && <FiArrowRight size={16} />}
    </button>
  );

  return link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default GlassButton;
