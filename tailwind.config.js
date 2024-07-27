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
      'cerise-red': {
        50: '#fef1f7',
        100: '#fee5f0',
        200: '#fecce3',
        300: '#ffa2cb',
        400: '#fe68a7',
        500: '#f83c86',
        600: '#e91f64',
        700: '#ca0c47',
        800: '#a70d3b',
        900: '#8b1034',
        950: '#55021a',
      },

      current: 'currentColor',
      primary: '#e91e63',
      darkPrimary: '#c2185b',
      lightPrimary: '#f8bbd0',
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
  plugins: [],
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
