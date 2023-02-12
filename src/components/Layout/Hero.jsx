//BUILT-IN REACT HOOKS
import React, { useEffect, useState } from 'react';

//ROUTING
import { Link } from 'react-router-dom';

//STYLING
import styles from './Hero.module.scss';

//DRY FUNCTIONS
import GetMovieDirector from '../../Dry_Functions/GetMovieDirector';
import GetMovieCasts from '../../Dry_Functions/GetMovieCasts';

//CONTEXT API
import { useContext } from 'react';
import DateContext from '../../store/contextStore/Date-Context';
import GenreContext from '../../store/contextStore/Genre-Context';

//SWIPER.JS AND IT'S ASSOCIATED MODULES
import { Autoplay } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// SWIPER.JS STYLING
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, EffectFade } from 'swiper';

//RTK QUERY
import { useFetchNowPlayingMoviesQuery } from '../../store/reduxStore/fetch/fetchApi';

const Hero = () => {
  //CONTEXT API
  const { monthsAgoDate, currentDate } = useContext(DateContext);
  const { movieGenres } = useContext(GenreContext);
  //immutable
  const { data, error, isLoading, isSuccess } = useFetchNowPlayingMoviesQuery({
    monthsAgoDate,
    currentDate,
  });
  const [listOfCasts, setListOfCasts] = useState({ casts: [], directors: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadedMoviesEn, setLoadedMoviesEn] = useState(null);

  //! fetchURL is not able to access state upon execution but it can with
  //! global variables (like the ones below)
  let loadedMovies;
  let loadedMoviesSortedList;
  useEffect(() => {
    if (data) {
      //essential rule of redux is keeping the state/data immutable
      //therefore here we make a clone of the existing state using the spread operator
      loadedMovies = [...data.results];
      loadedMovies.sort(
        (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadedMoviesSortedList = loadedMovies.filter((item) => {
        if (item.original_language == 'en') {
          return item;
        }
      });
      setLoadedMoviesEn(loadedMoviesSortedList);
      fetchUrl();
    }
  }, [data]);

  let bgImage = '';
  //fetching and organizing a list of popular cast names for
  //our four movies (already fetched) displayed in Hero section
  const fetchUrl = async () => {
    //retrieve a bunch of ID's from movie
    const listOfMovieIDs = loadedMoviesSortedList.map((item) => {
      return item.id;
    });
    //api call shouldn't exists in components like this but
    //this will be an exception considering it's not
    //viable to make two api calls with one dependent on another
    //at the same time
    const getDetails = async (id) => {
      //for fetching casts and directors
      let data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`
      );
      let movieCredits = await data.json();

      const director = GetMovieDirector(movieCredits.crew);
      const castNames = GetMovieCasts(movieCredits.cast);

      setListOfCasts((prevState) => ({
        ...prevState,
        casts: [...prevState.casts, castNames],
        directors: [...prevState.directors, director],
      }));
      setHasLoaded(true);
    };
    //retrieve casts for only 4 movies
    for (let i = 0; i < 6; i++) {
      await getDetails(listOfMovieIDs[i]);
    }
  };

  //ensures data has been retrieved before moving onwards
  if (data && listOfCasts && hasLoaded) {
    let nowPlayingMovies = loadedMoviesEn;
    //array of only four most popular movies
    nowPlayingMovies.splice(6);

    bgImage = (
      <>
        {nowPlayingMovies.map((item, index) => {
          let starring = [];
          let director = [];
          let genres = [];

          if (listOfCasts.casts[index] && listOfCasts.directors) {
            for (let genre of movieGenres) {
              item.genre_ids.find((item) => {
                if (item === genre.id) {
                  genres.push(genre.name);
                }
              });
            }

            genres.splice(3);
            {
              /* reason why we are using ES6’s Array.prototype.entries here
            and not a for-in loop 'for (let cast of listOfCasts[index])' is because
            this comes with a default index feature which we need to use for styling */
            }
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
                  <p className={`text-base inline-block`}>
                    {cast}
                    {i != 7 && ', '} &nbsp;
                  </p>
                  {i === 3 && <br></br>}
                  {i === 7 && (
                    <p className={`text-base block `}>
                      Release Date: {item.release_date}{' '}
                    </p>
                  )}
                </>
              );
            }
            for (let dir of listOfCasts.directors[index].entries()) {
              director.push(
                <>
                  <p>
                    <b>Director:</b> {dir}
                  </p>
                </>
              );
            }
          }

          return (
            <SwiperSlide key={item.id}>
              <Link to={`/details/movie/${item.id}`}>
                <div className='text-left'>
                  <div className='absolute left-8 bottom-16  text-white '>
                    <h1 className='text-6xl'>{item.title}</h1>
                    <p className='text-xl'>(Now Playing)</p>
                    <p className='text-3xl'>Rating {item.vote_average}</p>
                    <div className=''>
                      {director}
                      {starring}
                      <b>Genres: </b>
                      {genres.join(', ')}
                    </div>
                  </div>
                  <img
                    loading='lazy'
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://gravatar.com/avatar/418738537ab04bae411c5001438c99ca?s=400&d=robohash&r=x';
                    }}
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
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
