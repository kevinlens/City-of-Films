import React from 'react';
import styles from './Hero.module.scss';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, EffectFade } from 'swiper';

const Hero = () => {
  const movieArray = [
    {
      id: 1,
      movie:
        'https://image.tmdb.org/t/p/original/evaFLqtswezLosllRZtJNMiO1UR.jpg',
    },
    {
      id: 1,
      movie:
        'https://image.tmdb.org/t/p/original/ecaB1LUoQE1ylZJVF5KLRTkewt8.jpg',
    }
  ];
  return (
    <div className={["-lg:pt-16", styles.hero].join(" ")}>
      {/* progress bar */}
      <Swiper
        pagination={{
          // type: 'progressbar',
          type: 'bullets',
          clickable: true,
        }}
        effect={'fade'}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className='mySwiper'
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {movieArray.map((item) => (
          <SwiperSlide>
            <Link to="/details">
              
            <div >
              <img src={item.movie} alt='Image 2' />
            </div>
              
            </Link>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default Hero;
