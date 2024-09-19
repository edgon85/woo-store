/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    // Path to Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

    colors: {
      // 'french-lilac': {
      'cerise-red': {
        50: '#faf5f9',
        100: '#f7ecf5',
        200: '#f0daec',
        300: '#e5bedd',
        400: '#d393c4',
        500: '#c272ae',
        600: '#ad5592',
        700: '#944279',
        800: '#7b3965',
        900: '#683355',
        950: '#3d1a31',
      },

      current: 'currentColor',
      primary: '#ad5592',
      darkPrimary: '#944279',
      lightPrimary: '#c272ae',
      danger: '#ff4a4a',
      googleColor: '#4285f4',
      facebookColor: '#3b5998',
      divider: '#bdbdbd',
      background: '#f6f6f6',
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
    },
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {},
  extend: {
    '.no-spin-buttons': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: '0',
      },
      '&[type=number]': {
        '-moz-appearance': 'textfield',
      },
    },
  },
};
