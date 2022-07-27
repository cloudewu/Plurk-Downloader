/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/pages/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF574D', // official Plurk color
      },
      maxHeight: {
        unreachable: '100rem',
      },
      transitionProperty: {
        'max-h': 'max-height',
      },
    },
  },
  plugins: [],
};
