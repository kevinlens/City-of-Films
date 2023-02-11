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
    fontFamily: {
      soraLight: ['Custom-1', 'sans-serif'],
      sourceSansProLight: ['Custom-2', 'sans-serif'],
      sourceSansProRegular: ['Custom-3', 'sans-serif'],
      sourcePoppinsRegular: ['Custom-4', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        autoFill: 'repeat(auto-fill, 300px)',
      },
      fontSize: {
        xxs: '0.625rem',
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

        //!For a special case inside searchResults file
        '-1xl': { max: '1499px' },
        // => @media (max-width: 1535px) { ... }

        //!For a special case inside searchResults file
        '-lxl': { max: '1299px' },
        // => @media (max-width: 1279px) { ... }

        '-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        //!For a special case inside searchResults file
        '-sxl': { max: '1200px' },
        // => @media (max-width: 1279px) { ... }

        '-lg': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        '-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
      boxShadow: {
        smedium: '0 2px 8px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [require('preline/plugin')],
};
