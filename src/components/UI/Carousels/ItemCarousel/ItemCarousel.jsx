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

const ItemCarousel = ({ highestRatedMovies, title}) => {
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
          <SwiperSlide key={item.id}>
            <Link to={`/details/movie/${item.id}`}>
              <div className='py-3 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt='Image 2'
                />
                <p className='text-zinc-400'>
                  {item.title + ' (' + item.vote_average + ')'}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </>
    );
  }
  return (
    <div className={`${styles.itemCarousel} my-4 mx-8`}>
      <h1 className='text-3xl mt-10 mb-2 text-white'>
        {title}
      </h1>
      <Swiper
        slidesPerView={currentMedia}
        spaceBetween={12}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        initialSlide={4}
        className='mySwiper'
      >
        {movieCards}
      </Swiper>
    </div>
  );
};

export default ItemCarousel;
