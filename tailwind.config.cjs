/** @type {import('tailwindcss').Config} */
module.exports = {
  //just in time mode makes build time much faster
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx}',
    './main.html',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
};
