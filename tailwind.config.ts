// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        nickysans: ['var(--font-nickysans)'],
      },
    },
  },
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], // adjust paths if needed
  plugins: [],
};
export default config;
