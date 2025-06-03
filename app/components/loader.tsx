// components/loader.tsx
"use client";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/lottie/loading.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="w-40 h-40">
        <Lottie animationData={loaderAnimation} loop autoplay />
      </div>
    </div>
  );
};

export default Loader;
