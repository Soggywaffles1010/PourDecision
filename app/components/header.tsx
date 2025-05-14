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
      <div className="mx-20 h-full grid grid-cols-4 items-center gap-[20px]">
        <div className="text-white font-bold">
        <Image src="/images/logo.png" alt="Logo" width={200} height={100} >

          </Image>
        </div>

        <div className="col-span-2">
          <div className="bg-white/30 text-white px-4 py-2 rounded-md backdrop-blur-md">
            Searchbar
          </div>
        </div>

        <div className="text-white text-right">Sign In</div>
      </div>
    </div>
  );
};

export default Header;
