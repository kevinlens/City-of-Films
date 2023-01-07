import React from 'react';
import styles from './ItemCarousel.module.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';
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
  }
];
const ItemCarousel = () => {
  return (
    <div className={`${styles.itemCarousel} my-4 mx-8`}>
      <h1 className='text-4xl mb-4 text-white'>Latest</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={12}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
      >
        {movieArray.map((item) => (
          <SwiperSlide>
            <div className='py-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer'>
            <img src={item.movie} alt='Image 2' />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default ItemCarousel;
