/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      'R-shop': '#b70f15',
      'M-shop': '#1b458f',
    },
  },
};
export const plugins = [
  require('daisyui'),
];
export const daisyui = {
  themes: [
    'cupcake',
    'business',
  ],
  darkTheme:"business",
};

