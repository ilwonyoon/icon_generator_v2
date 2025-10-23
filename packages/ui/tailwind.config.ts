import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-hover': '#1a1a1a',
        'primary-light': '#333333',
      },
      borderRadius: {
        btn: '12px',
      },
      height: {
        btn: '40px',
      },
    },
  },
  plugins: [],
};

export default config;
