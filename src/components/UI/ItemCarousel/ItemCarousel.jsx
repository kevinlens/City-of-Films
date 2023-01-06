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

const ItemCarousel = () => {
  return (
    <div className={`${styles.itemCarousel} my-4 mx-8`}>
      <h1 className='text-4xl mb-4'>Latest</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/jazlkwXfw4KdF6fVTRsolOvRCmu.jpg`}
              alt='Random image'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/c1bz69r0v065TGFA5nqBiKzPDys.jpg`}
              alt='Random image'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg`}
              alt='Random image'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg`}
              alt='Random image'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg`}
              alt='Random image'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg`}
              alt='Random 222image'
            />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default ItemCarousel;
