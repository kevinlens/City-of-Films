import { useState, useEffect } from 'react';
// Default theme
import '@splidejs/react-splide/css';

// or only core styles
import '@splidejs/react-splide/css/core';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Secondary_AutoScrollCarousel = (props) => {
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
  }, []);

  function handleMobileMediaQueryChange(event) {
    setIsMobile(event.matches);
  }

  function handleTabletMediaQueryChange(event) {
    setIsTablet(event.matches);
  }

  let currentMedia = isMobile ? 4 : isTablet ? 6 : 9;

  const movieArray = [
    {
      id: 1,
      movie:
        'https://image.tmdb.org/t/p/original/wMDUDwAArpfGdtTTZ25SfwngGwt.jpg',
    },
    {
      id: 1,
      movie:
        'https://image.tmdb.org/t/p/original/m80kPdrmmtEh9wlLroCp0bwUGH0.jpg',
    },
    {
      id: 1,
      movie:
        'https://image.tmdb.org/t/p/original/9z4jRr43JdtU66P0iy8h18OyLql.jpg',
    },
  ];

  return (
    <div className='mt-2'>
      <Splide
        aria-label='...'
        options={{
          type: 'loop',
          focus: 'center',
          perPage: currentMedia,
          gap: 10,
          arrows: false,
          drag: false,
          autoScroll: {
            speed: props.speed,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {movieArray.map((item) => (
          <SplideSlide>
            <div className='py-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
              <img src={item.movie} alt='Image 2' />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Secondary_AutoScrollCarousel;
