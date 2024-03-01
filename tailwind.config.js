/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '150': '600px',
      },
      boxShadow: {
        'container': '0 0 10px (0, 0, 0, 0.3)',
      },
      container: {
        center: true,
      }
    }
  },
  plugins: []
};
