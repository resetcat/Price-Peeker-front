/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      'R-shop': '#b70f15',
      'M-shop': '#1b458f',
      'S&V-shop': '#e53011',
      'LB-shop': '#f29300',
      'V-shop': '#862149',
      'AO-shop': '#990044',
      'SA-shop': '#c04c0c',
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

