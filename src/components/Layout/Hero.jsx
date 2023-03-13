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
import FormOfEntertainmentContext from '../../store/contextStore/FormOfEntertainment-Context';
import LoadingCompleteContext from '../../store/contextStore/LoadingComplete-Context'
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
import { useFetchPopularTVShowsQuery } from '../../store/reduxStore/fetch/fetchTVShowsApi';

//COMPONENTS
import Loader from '../UI/Loader/Loader';

const Hero = () => {
  //* CONTEXT API
  const { monthsAgoDate, currentDate } = useContext(DateContext);
  const { movieGenres } = useContext(GenreContext);
  const { currentFormIsMovies } = useContext(FormOfEntertainmentContext);
  const {setLoadedToTrue} = useContext(LoadingCompleteContext);
  
  //* IMMUTABLE QUERIES
  const { data, error, isLoading, isSuccess } = useFetchNowPlayingMoviesQuery({
    monthsAgoDate,
    currentDate,
  });
  const { data: data2 } = useFetchPopularTVShowsQuery();

  //* STATES
  const [listOfCasts, setListOfCasts] = useState({ casts: [], directors: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadedMoviesEn, setLoadedMoviesEn] = useState(null);
  //for ensuring movies/tv slides can change dynamically

  //! fetchURL is not able to access state upon execution but it can with
  //! global variables (like the ones below)
  let loadedMovies;
  let loadedMoviesSortedList;
  let bgImage = '';

  //for ensuring movies/tv slides can change dynamically
  //to separate for easier to read code
  useEffect(() => {
    setListOfCasts({ casts: [], directors: [] });

    //if context global entertainment form changes from movies to TV etc.
  }, [currentFormIsMovies]);

  useEffect(() => {
    if (data && data2) {
      //essential rule of redux is keeping the state/data immutable
      //therefore here we make a clone of the existing state using the spread operator
      if (currentFormIsMovies) {
        loadedMovies = [...data.results];
      } else {
        loadedMovies = [...data2.results];
      }
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
  }, [data, data2, currentFormIsMovies]);

  //fetching and organizing a list of popular cast names for
  //our four movies (already fetched) displayed in Hero section
  const fetchUrl = async () => {
    //!------------------TV SHOWS DATA SECTION (BELOW) / REFACTOR WHEN YOU HAVE TIME
    let totalPages = 3;

    const fetchTotalPages = async (index) => {
      let pageNumber = index + 1;
      let data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=${pageNumber}`
      );
      let movieData = await data.json();
      return movieData;
      // const rawMovies = [...movieData.results];
      // setListOfMovies((currentSetOfMovies) => [
      //   ...currentSetOfMovies,
      //   ...rawMovies,
      // ]);
    };

    // for (let index = 1; index <= totalPages; index++) {
    //   await fetchTotalPages(index);
    // }

    // * fetches all url at once as each url is limited to 20 array elements
    const list = await Promise.all(
      Array.from({ length: totalPages }, (_, index) => fetchTotalPages(index))
    );

    let entireList = [];

    // * merge all array elements
    list.forEach((item) => {
      let reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });

    let sortedList = entireList.filter((item) => {
      if (item.original_language == 'en') {
        return item;
      }
    });

    sortedList.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    //!------------------TV SHOWS DATA SECTION (ABOVE) / REFACTOR WHEN YOU HAVE TIME

    let listOfMovieIDs;
    //retrieve a bunch of ID's from movie
    if (currentFormIsMovies) {
      listOfMovieIDs = loadedMoviesSortedList.map((item) => {
        return item.id;
      });
    } else {
      setLoadedMoviesEn(sortedList);
      listOfMovieIDs = sortedList.map((item) => {
        return item.id;
      });
    }
    //api call shouldn't exists in components like this but
    //this will be an exception considering it's not
    //viable to make two api calls with one dependent on another
    //at the same time
    const getDetails = async (id) => {
      let data;
      let movieCredits;
      //for fetching casts and directors
      if (currentFormIsMovies) {
        data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`
        );
        movieCredits = await data.json();
      } else {
        data = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`
        );
        movieCredits = await data.json();
      }
      // ! Note: Directors might not be available for some TV Shows from TMDB
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
    setLoadedToTrue()
  };

  //ensures data has been retrieved before moving onwards
  if (data && data2 && listOfCasts && hasLoaded) {
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
                  {/* ensures all the previous elements are loaded before we add a new element for line break purposes */}
                  {i === listOfCasts.casts[index].length - 1 && (
                    <p className={`text-base block `}>
                      <b>
                        {currentFormIsMovies
                          ? 'Release Date:'
                          : 'First Air Date'}
                      </b>{' '}
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </p>
                  )}
                </>
              );
            }
            for (let dir of listOfCasts.directors[index].entries()) {
              director.push(
                <>
                  <p>
                    <b>Director:</b> {dir[1]}
                  </p>
                </>
              );
            }
          }

          return (
            <SwiperSlide key={item.id}>
              <Link
                to={`/details/${currentFormIsMovies ? 'movies' : 'tvShows'}/${
                  item.id
                }`}
              >
                <div className='text-left mb-16'>
                  <div className='absolute left-8 bottom-16  text-white '>
                    <h1 className='text-6xl'>
                      {item.title ? item.title : item.name}
                    </h1>
                    <p className='text-xl'>
                      {currentFormIsMovies ? '(Now Playing)' : '(Now Airing)'}
                    </p>
                    <p className='text-3xl -sm:hidden'>Rating {item.vote_average}</p>
                    <div className='-sm:hidden'>
                      {director}
                      {starring}
                      <b>Genres: </b>
                      {genres.join(', ')}
                    </div>
                  </div>
                  <img
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
        {bgImage ? bgImage : 
        <div className='mt-24'>
          <Loader />
        </div>
        
        }
      </Swiper>
    </div>
  );
};

export default Hero;
