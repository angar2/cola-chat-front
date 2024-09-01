import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        a: '#FFFFFF',
        b: '#F0EFDB',
        c: '#6D6D6D',
        d: '#98BDBD',
        e: '#BF4124',
        f: '#590902',
        g: '#0D0D0D',
      },
    },
  },
  plugins: [],
};
export default config;
