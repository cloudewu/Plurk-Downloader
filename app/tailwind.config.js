/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/pages/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        rxs: '0.75em',
        rsm: '0.875em',
        rbase: '1em',
        rlg: '1.125em',
        rxl: '1.25em',
      },
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
