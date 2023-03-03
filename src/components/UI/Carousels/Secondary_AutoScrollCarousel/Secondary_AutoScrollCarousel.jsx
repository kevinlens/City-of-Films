//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//ROUTING
import { Link } from 'react-router-dom';

// Default theme
import '@splidejs/react-splide/css';

// or only core styles
import '@splidejs/react-splide/css/core';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Secondary_AutoScrollCarousel = ({
  latestMovies,
  speed,
  currentFormIsMovies,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileMql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileMql.matches);
    mobileMql.addEventListener('change', handleMobileMediaQueryChange);

    const tabletMql = window.matchMedia('(max-width: 1024px)');
    setIsTablet(tabletMql.matches);
    tabletMql.addEventListener('change', handleTabletMediaQueryChange);

    return () => {
      mobileMql.removeEventListener('change', handleMobileMediaQueryChange);
      tabletMql.removeEventListener('change', handleTabletMediaQueryChange);
    };
  }, [latestMovies]);

  function handleMobileMediaQueryChange(event) {
    setIsMobile(event.matches);
  }

  function handleTabletMediaQueryChange(event) {
    setIsTablet(event.matches);
  }

  let currentMedia = isMobile ? 4 : isTablet ? 6 : 9;
  let movieCards = '';

  if (latestMovies) {
    movieCards = (
      <>
        {latestMovies.map((item) => (
          <SplideSlide key={item.id}>
            <Link
              to={`/details/${currentFormIsMovies ? 'movies' : 'tvShows'}/${
                item.poster_path ? item.id : 576845
              }`}
            >
              <div className='py-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
                <img
                  src={`${item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : `https://image.tmdb.org/t/p/original/ahbwIJl7T0D34m3sPKlBaCqs2xH.jpg`}`}
                  alt='Image 2'
                />
              </div>
            </Link>
          </SplideSlide>
        ))}
      </>
    );
  }

  return (
    <div className='mt-2'>
      <Splide
        aria-label='...'
        options={{
          type: 'loop',
          focus: 'center',
          perPage: currentMedia,
          gap: 10,
          pagination: false,
          arrows: false,
          drag: false,
          autoScroll: {
            speed: speed,
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

export default Secondary_AutoScrollCarousel;
