'use client';

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm sm:text-base text-center md:text-left">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-full mb-3">
            <Link href="/" className="block w-full h-full">
              <Image
                src="/images/13(1).png"
                alt="Logo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </Link>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Pour Decision Cafe</h2>
          <p className="text-yellow-100 text-xs sm:text-sm">
            Every Pour Is A Good Decision
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 flex flex-col items-center md:items-start text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <a href="mailto:pourdecisioncafe@gmail.com" className="hover:underline">
              arusman1987@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <a href="tel:+639123456789" className="hover:underline">
              +63 9303917762
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <p>Digos City, Davao del Sur</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start text-xs sm:text-sm">
          <p className="mb-3 font-semibold">Follow Us</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={22} className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube size={22} className="hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center text-xs sm:text-sm text-yellow-200 border-t border-yellow-800 pt-4">
        &copy; {new Date().getFullYear()} Pour Decision Cafe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
