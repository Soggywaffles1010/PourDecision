
import React from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi'; // Icon examples
import GlassButton from './thbutton';
import Spline from '@splinetool/react-spline/next';
 

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Add your scene or content here */}
      {/* <Spline scene="https://prod.spline.design/1DPKdjdMrjtYxl16/scene.splinecode" /> */}
      <Spline
        scene="https://prod.spline.design/aNjtleitifFxGQzn/scene.splinecode" 
      />
      {/* Button container */}
      <div className="absolute top-1/2 left-32 transform -translate-x-1/2 flex gap-8 z-10 mt-16 ml-44">
        <GlassButton text="Get Started" icon={<FiPlay />} delay={4000}   stroke="rgba(255, 255, 255, 0)"/> {/* 4-second delay */}
        <GlassButton
          text="Learn More"
          icon={<FiInfo />}
          fill="rgba(255, 255, 255, 0)"
          stroke="rgba(255, 255, 255, 0.4)"
          delay={4000} 
        />
      </div>
    </div>
  );
};

export default Hero;
