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

const Primary_AutoScrollCarousel = ({ collectionOfMovies }) => {
  const [isMobile, setIsMobile] = useState(false);

  // *! Has to be an EVEN amount of items or will cause a loop reset glitch!
  const {upcomingMovies} = collectionOfMovies;
  const {latestMovies} = collectionOfMovies;

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleMediaQueryChange);

    return () => {
      mql.removeEventListener('change', handleMediaQueryChange);
    };
  }, [upcomingMovies]);

  let movieCards = '';

  if (collectionOfMovies.upcomingMovies) {
    movieCards = (
      <>
        {upcomingMovies.map((item) => (
          <SplideSlide className='odd:mt-24' key={item.id}>
            <Link to={`/details/movie/${item.id}`}>
              <div className='py-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
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
        Upcoming Movies
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

        {/* <SplideSlide>
        <img
          src='https://image.tmdb.org/t/p/original/m80kPdrmmtEh9wlLroCp0bwUGH0.jpg'
          alt='Image 2'
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src='https://image.tmdb.org/t/p/original/9z4jRr43JdtU66P0iy8h18OyLql.jpg'
          alt='Image 2'
        />
      </SplideSlide> */}
      </Splide>
    </div>
  );
};

export default Primary_AutoScrollCarousel;
