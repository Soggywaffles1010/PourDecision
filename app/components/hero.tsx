import React from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';
import GlassButton from './thbutton';

const Hero = () => {
  return (
    <div className="relative h-[50vh] sm:h-[75vh] w-full overflow-hidden">
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
      <div className="relative z-10 h-full flex flex-col justify-center items-start sm:items-start px-6 sm:px-[50px] gap-6 text-center sm:text-left">
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
            Pour Decision
          </h1>
          <p className="text-xl sm:text-3xl text-white drop-shadow-md mt-2">
            Because every pour is a good decision
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4 items-center sm:items-start  justify-center px-24 sm:px-0 ">
          <a href="#category">
            <GlassButton text="Get Started" icon={<FiPlay />} delay={4000} />
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
