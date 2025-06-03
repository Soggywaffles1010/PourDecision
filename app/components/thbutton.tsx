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
  className?: string;
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
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const baseStyles = `
    flex items-center justify-center gap-2
    px-4 py-2 sm:px-6 sm:py-3
    rounded-xl text-sm sm:text-base md:text-lg
    backdrop-blur-md border transition-all duration-300 ease-in-out
    font-medium text-foreground border-foreground
    hover:bg-accent hover:text-background
    hover:scale-105
    ${showButton ? 'opacity-100' : 'opacity-0'}
    ${className || ''}
  `;

  if (link) {
    return (
      <Link href={link} className={`w-full sm:w-auto ${baseStyles}`}>
        {icon ?? <FiArrowRight size={18} />}
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {icon ?? <FiArrowRight size={18} />}
      {text}
    </button>
  );
};

export default GlassButton;
