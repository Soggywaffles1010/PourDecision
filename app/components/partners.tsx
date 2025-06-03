'use client';
import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const partnerLogos = [
  { src: '/logos/bpaii.png', alt: 'BPAII' },
  { src: '/logos/partner1.png', alt: 'Partner 1' },
  { src: '/logos/partner2.png', alt: 'Partner 2' },
  { src: '/logos/partner3.png', alt: 'Partner 3' },
  { src: '/logos/partner4.png', alt: 'Partner 4' },
  { src: '/logos/partner5.png', alt: 'Partner 5' },
  // Add more logos here...
];

const PartnersLogosSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-900 mb-8">
        Our Partners & Supporters
      </h2>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex gap-10 px-4">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center min-w-[120px] md:min-w-[160px] h-[80px] md:h-[100px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={80}
                className="object-contain max-h-full max-w-full grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default PartnersLogosSection;
