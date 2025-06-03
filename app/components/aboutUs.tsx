'use client';
import React from 'react';
import Image from 'next/image';

const AboutUsSection: React.FC = () => {
  return (
    <section className="w-full px-6 py-16 bg-white text-gray-800">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-yellow-900">About Us</h2>

      {/* Section 1: Image Left */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/about-1.jpg" // Replace with actual image
            alt="We are students"
            width={600}
            height={400}
            className="rounded-2xl shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 text-lg leading-relaxed">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-800">We are Students</h3>
          <p className="mb-4">
            We are proud scholars of the <strong>Bakery and Pastry Arts Institute, Inc. (BPAII)</strong>, a technical-vocational institute accredited by <strong>TESDA</strong>. As part of our Barista NC II training, we are required to undergo a <strong>Café Simulation</strong> that immerses us in the operations of a real coffee shop.
          </p>
          <p>
            This experience gives us hands-on knowledge of customer service, beverage preparation, teamwork, and café management. It is not just a simulation — it is a vital stepping stone in our professional journey. BPAII is committed to nurturing skill, discipline, and a spirit of innovation in every student.
          </p>
        </div>
      </div>

      {/* Section 2: Image Right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/about-2.jpg" // Replace with actual image
            alt="We are baristas"
            width={600}
            height={400}
            className="rounded-2xl shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 text-lg leading-relaxed">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-800">We are Baristas</h3>
          <p className="mb-4">
            From this simulation emerged <strong>Pour Decision Café</strong> — a project born of passion, purpose, and our shared dream to build something meaningful. Although this café operates only for two days, its impact reaches far beyond the schedule.
          </p>
          <p>
            Pour Decision is more than just a pop-up café. It’s an advocacy. We aim to build a community of brewers, farmers, roasters, café owners, and coffee enthusiasts who support <strong>ethical business practices</strong>, celebrate <strong>local craftsmanship</strong>, and promote <strong>coffee education</strong>.
            We believe that the coffee culture in <strong>Digos and Davao del Sur</strong> has the potential to grow — and we want to help brew that future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
