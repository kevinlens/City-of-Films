//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//ROUTING
import { Link } from 'react-router-dom';

//SPLIDE.JS STYLING
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import '@splidejs/splide/dist/css/splide.min.css';

//SPLIDE.JS AND IT'S ASSOCIATED MODULES
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Primary_AutoScrollCarousel = ({
  collectionOfMovies,
  currentFormIsMovies,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // *! Has to be an EVEN amount of items or will cause a loop reset glitch!
  const { upcomingMovies } = collectionOfMovies;

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleMediaQueryChange);

    return () => {
      mql.removeEventListener('change', handleMediaQueryChange);
    };
  }, [upcomingMovies]);

  let movieCards = '';

  if (upcomingMovies) {
    movieCards = (
      <>
        {upcomingMovies.map((item) => (
          <SplideSlide className='odd:mt-24' key={item.id}>
            {/* in the case that the item doesn't exist we'll be replacing it's id to default id */}
            <Link
              to={`/details/${currentFormIsMovies ? 'movies' : 'tvShows'}/${
                item.poster_path ? item.id : 576845
              }`}
            >
              <div className='py-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
                <img
                  src={`${
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : `https://image.tmdb.org/t/p/original/ahbwIJl7T0D34m3sPKlBaCqs2xH.jpg`
                  }`}
                  alt='Image 2'
                />
              </div>
            </Link>
          </SplideSlide>
        ))}
      </>
    );
  }

  function handleMediaQueryChange(event) {
    setIsMobile(event.matches);
  }
  let currentMedia = isMobile ? 2 : 4;

  return (
    <div className='mt-4 mb-8 relative text-center'>
      <h1 className='text-6xl top-[-10px] left-0 right-0 text-white absolute z-10 mix-blend-exclusion'>
        {currentFormIsMovies ? 'Upcoming Movies' : 'Popular TV Shows'}
      </h1>
      <Splide
        aria-label='...'
        options={{
          type: 'loop',
          focus: 'center',
          perPage: currentMedia,
          gap: 10,
          arrows: false,
          pagination: false,
          drag: false,
          autoScroll: {
            speed: 0.8,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {movieCards}
      </Splide>
    </div>
  );
};

export default Primary_AutoScrollCarousel;
