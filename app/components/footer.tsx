import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Pour Decision Cafe</h2>
          <p className="text-sm text-yellow-100">
            Brewing with purpose. Powered by the students of BPAII.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <a href="mailto:pourdecisioncafe@gmail.com" className="hover:underline">
              pourdecisioncafe@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <a href="tel:+639123456789" className="hover:underline">
              +63 912 345 6789
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <p>Digos City, Davao del Sur</p>
          </div>
        </div>

        {/* Social Media */}
        <div>
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
      <div className="mt-10 text-center text-sm text-yellow-200 border-t border-yellow-800 pt-4">
        &copy; {new Date().getFullYear()} Pour Decision Cafe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
