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
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      fontFamily: {
        soraLight: ['Sora-Light', 'sans-serif'],
      },
      height: {
        98: '26.0625rem',
        100: '28rem',
        102: '30rem',
        104: '32rem',
        108: '36rem',
        112: '40rem',
        116: '44rem',
      },
      screens: {
        '-2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        '-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }
        
        '-lg': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        '-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [require('preline/plugin')],
};
