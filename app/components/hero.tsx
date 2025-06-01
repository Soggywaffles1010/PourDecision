import React from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';
import GlassButton from './thbutton';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[50px] gap-6">
        <div>
          <h1 className="text-[5rem] font-bold text-white drop-shadow-lg">Pour Decision</h1>
          <p className="text-[3rem] text-white drop-shadow-md mt-2">Because every pour is a good decision</p>
        </div>

        <div className="flex gap-8 mt-4">
          <a href="#category">
            <GlassButton text="Get Started" icon={<FiPlay />} delay={4000} stroke="rgba(255, 255, 255, 0)" />
          </a>
          <a href="#category">
            <GlassButton
              text="Order Now"
              icon={<FiInfo />}
              fill="rgba(255, 255, 255, 0)"
              stroke="rgba(255, 255, 255, 0.4)"
              delay={4000}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
