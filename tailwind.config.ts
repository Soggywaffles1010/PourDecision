// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        nickysans: ['var(--font-nickysans)'],
      },
      colors: {
        brand: {
          background: '#1E1A17',  // Dark Coffee Brown
          text: '#F3ECE7',        // Creamy White
          accent: '#D4A373',      // Caramel Tan
          hover: '#A47148',       // Deep Mocha
          link: '#ECD6C0',        // Soft Latte
          icon: '#F3ECE7',        // Same as text
        },
      },
    },
  },
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], // adjust paths if needed
  plugins: [],
};

export default config;
