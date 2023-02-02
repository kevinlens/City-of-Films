//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//ROUTING
import { Link } from 'react-router-dom';

//STYLING
import styles from './ItemCarousel.module.scss';

// SWIPER FOR REACT
import { Swiper, SwiperSlide } from 'swiper/react';

// REQUIRED MODULES
import { Pagination, Navigation } from 'swiper';

// SWIPER STYLING
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const movieArray = [
  {
    id: 1,
    movie:
      'https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg',
  },
  {
    id: 1,
    movie:
      'https://image.tmdb.org/t/p/original/c1bz69r0v065TGFA5nqBiKzPDys.jpg',
  },
  {
    id: 1,
    movie:
      'https://image.tmdb.org/t/p/original/jazlkwXfw4KdF6fVTRsolOvRCmu.jpg',
  },
  {
    id: 1,
    movie:
      'https://image.tmdb.org/t/p/original/c1bz69r0v065TGFA5nqBiKzPDys.jpg',
  },
];

const ItemCarousel = ({highestRatedMovies}) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleMediaQueryChange);

    return () => {
      mql.removeEventListener('change', handleMediaQueryChange);
    };
  }, [highestRatedMovies]);

  function handleMediaQueryChange(event) {
    setIsMobile(event.matches);
  }
  let currentMedia = isMobile ? 2 : 4;
  let movieCards = '';
  if (highestRatedMovies) {
    movieCards = (
      <>
        {highestRatedMovies.map((item) => (
          <SwiperSlide>
            <Link to='/details'>
              <div className='py-3 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
                <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt='Image 2' />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </>
    );
  }
  return (
    <div className={`${styles.itemCarousel} my-4 mx-8`}>
      <h1 className='text-3xl mt-10 mb-2 text-white uppercase'>Latest</h1>
      <Swiper
        slidesPerView={currentMedia}
        spaceBetween={12}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
      >
        {movieCards}
      </Swiper>
    </div>
  );
};

export default ItemCarousel;
