'use client';
 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
 
type GlassButtonProps = {
  text: string;
  icon?: React.ReactNode;
  fill?: string; // background color
  stroke?: string; // border color
  delay?: number; // delay in milliseconds before the button appears
  fontSize?: string; // dynamic font size
  fontWeight?: string; // dynamic font weight
  onClick?: () => void; // Add this line to allow the onClick prop
  link?:string;
   
};

const GlassButton: React.FC<GlassButtonProps> = ({
  text,
  icon,
  fill,
  stroke,
  delay = 0,
  fontSize = '1rem', // Default font size
  fontWeight = '500', // Default font weight
  onClick,
  link,
 
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, delay); // Delay in milliseconds

    return () => clearTimeout(timer);
  }, [delay]);

  const buttonContent = (
    <button
      onClick={onClick}
      className={`cursor-pointer
        flex items-center gap-2 px-6 py-3 rounded-xl 
        backdrop-blur-md border text-yellow-700 font-medium
        transition-all duration-300 ease-in-out 
        ${showButton ? 'opacity-100' : 'opacity-0'} 
        hover:scale-105 hover:bg-white/20
      `}
      style={{
        backgroundColor: fill || 'rgba(255, 255, 255, 0.15)',
        borderColor: stroke || 'rgba(255, 255, 255, 0.3)',
        borderWidth: '1px',
        fontSize,
        fontWeight,
      }}
    >
      {icon && <span>{icon}</span>}
      {text}
      {!icon && <FiArrowRight size={14} />}
    </button>
  );

  return link ? <Link href={link} target="_blank" rel="noopener noreferrer">{buttonContent}</Link> : buttonContent;
};

export default GlassButton;
