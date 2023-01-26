import React, { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import DateContext from '../../store/contextStore/Date-Context';
import GenreContext from '../../store/contextStore/Genre-Context';
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
import { useFetchLatestPopularMoviesQuery } from '../../store/reduxStore/features/filmApi';
import { list } from 'postcss';

const Hero = () => {
  const { monthsAgoDate, currentDate } = useContext(DateContext);
  const {movieGenres} = useContext(GenreContext);
  //you are not allowed to adjust these variables ex: data1, movieError, etc
  //they are also immutable
  const { data, error, isLoading, isSuccess } =
    useFetchLatestPopularMoviesQuery({ monthsAgoDate, currentDate });
  const [listOfCasts, setListOfCasts] = useState({ casts: [], directors: [] });

  useEffect(() => {
    if (!isLoading) {
      fetchUrl();
    }
  }, [data]);

  let bgImage = '';

  //fetching and organizing a list of popular cast names for
  //our four movies (already fetched) displayed in Hero section
  const fetchUrl = async () => {
    const listOfMovies = [...data.results];
    //filter for most popular movies
    listOfMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    //retrieve a bunch of ID's from movie
    const listOfMovieIDs = listOfMovies.map((item) => {
      return item.id;
    });
    //api call shouldn't exists in components like this but
    //this will be an exception considering it's not
    //viable to make two api calls with one dependent on another
    //at the same time
    const getDetails = async (id) => {
      let data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`
      );
      let movieCredits = await data.json();

      let rawDirectorsData = movieCredits.crew.filter((item) => {
        return item.department === 'Directing';
      });
      rawDirectorsData.sort(
        (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
      );

      const rawDirectors = rawDirectorsData.slice(0, 1);
      const directors = rawDirectors.map((item) => {
        return item.name;
      });
      let casts = movieCredits.cast;
      let filteredCasts;
      //sort all casts by popularity: desc order
      casts.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
      //get only 8 of the most popular casts
      filteredCasts = casts.slice(0, 8);
      //retrieve the casts name
      let castNames = filteredCasts.map((item) => {
        return item.name + ', ';
      });
      setListOfCasts((prevState) => ({
        ...prevState,
        casts: [...prevState.casts, castNames],
        directors: [...prevState.directors, directors],
      }));
    };
    //retrieve casts for only 4 movies
    for (let i = 0; i < 6; i++) {
      await getDetails(listOfMovieIDs[i]);
    }
  };

  //ensures data has been retrieved before moving onwards
  if (data && listOfCasts) {
    //essential rule of redux is keeping the state/data immutable
    //therefore here we make a clone of the existing state using the spread operator
    const movies = [...data.results];
    //organize movies by most vote counts: desc order
    movies.sort((a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count));

    //array of only four most popular movies
    const popularMovies = movies.slice(0, 6);
    bgImage = (
      <>
        {popularMovies.map((item, index) => {
          let starring = [];
          let director = [];
          if (listOfCasts.casts[index] && listOfCasts.directors) {
            console.log('🔥🔥🔥');
            console.log(item);
            //reason why we are using ES6’s Array.prototype.entries here
            //and not a for-in loop 'for (let cast of listOfCasts[index])' is because
            //this comes with a default index feature which we need to use for styling
            for (let [i, cast] of listOfCasts.casts[index].entries()) {
              starring.push(
                <>
                  <p
                    className={`font-bold ${
                      i === 0 ? 'inline-block' : 'hidden'
                    }`}
                  >
                    Starring: &nbsp;
                  </p>
                  <p className={`text-base inline-block`}>{cast} &nbsp;</p>
                  {i === 3 && <br></br>}
                  {i === 7 && (
                    <p className={`text-base block `}>
                      Release Date: {item.release_date}{' '}
                    </p>
                  )}
                </>
              );
            }
            for (let [d, dir] of listOfCasts.directors[index].entries()) {
              director.push(
                <>
                  <p>Director: {dir}</p>
                </>
              );
            }
          }

          return (
            <SwiperSlide key={item.id}>
              <Link to='/details'>
                <div>
                  <div className='absolute top-36 text-white w-full'>
                    <h1 className='text-6xl'>{item.title}</h1>
                    <p className='text-3xl'>Rating {item.vote_average}</p>
                    <div className=''>
                      {director}
                      {starring}
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt='Image 2'
                  />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </>
    );
  }

  return (
    <div className={['-lg:pt-16', styles.hero].join(' ')}>
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
        {bgImage}
      </Swiper>
    </div>
  );
};

export default Hero;
