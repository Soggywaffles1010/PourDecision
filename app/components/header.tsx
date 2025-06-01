'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 3500); // 3.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        absolute top-0 left-0 w-full h-32 z-50
        bg-white/15 backdrop-blur-sm transition-transform duration-700 ease-out
        ${showHeader ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="h-full px-6 md:px-20 flex items-center justify-between md:justify-start gap-4 md:gap-6">
        
        {/* Logo */}
        <div className="w-24 h-24 overflow-hidden rounded-full mx-auto md:mx-0">
          <Image
            src="/images/1.png"
            alt="Logo"
            width={90}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Sign In (only visible on medium+ screens) */}
        <div className="hidden md:block text-white ml-auto">Sign In</div>
      </div>
    </div>
  );
};

export default Header;
