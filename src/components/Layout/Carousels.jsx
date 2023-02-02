import React, { useEffect, useState } from 'react';

import ItemCarousel from '../UI/Carousels/ItemCarousel/ItemCarousel';
import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

//CAROUSEL COMPONENTS
import Primary_AutoScrollCarousel from '../UI/Carousels/Primary_AutoScrollCarousel/Primary_AutoScrollCarousel';
import Secondary_AutoScrollCarousel from '../UI/Carousels/Secondary_AutoScrollCarousel/Secondary_AutoScrollCarousel';

//RTK QUERY
import {
  useFetchLatestMoviesQuery,
  useFetchLatestMoviesPage2Query,
  useFetchUpcomingMoviesQuery,
  useFetchHighestRatedQuery,
  useFetchHighestRatedPage2Query,
  useFetchHighestRatedPage3Query,
} from '../../store/reduxStore/fetch/fetchApi';

//CONTEXT API
import { useContext } from 'react';
import DateContext from '../../store/contextStore/Date-Context';

const Carousels = () => {
  //CONTEXT API
  const { last60DaysDate, currentDate, lastDecadeDate } =
    useContext(DateContext);
  const { data: movieLatest } = useFetchLatestMoviesQuery({
    last60DaysDate,
    currentDate,
  });
  const { data: movieLatestPage2 } = useFetchLatestMoviesPage2Query({
    last60DaysDate,
    currentDate,
  });
  const { data: movieUpcoming } = useFetchUpcomingMoviesQuery({ currentDate });
  const { data: movieHighestRated } = useFetchHighestRatedQuery({
    lastDecadeDate,
  });
  const { data: movieHighestRatedPage2 } = useFetchHighestRatedPage2Query({
    lastDecadeDate,
  });
  const { data: movieHighestRatedPage3 } = useFetchHighestRatedPage3Query({
    lastDecadeDate,
  });

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if ((movieLatest, movieUpcoming)) {
      setHasLoaded(true);
    }
  }, [movieLatest, movieLatestPage2, movieUpcoming]);

  let latestMovies = '';
  let latestMoviesPage2 = '';
  let upcomingMovies = '';
  let highestRatedMoviesEn = '';
  let highestRatedMoviesInt = '';

  if (hasLoaded && movieLatest) {
    //need to declare a separate function here in order to filter for movies in English
    const upcomingMoviesLists = [...movieUpcoming.results];
    const highestRatedMovies = [
      ...movieHighestRated.results,
      ...movieHighestRatedPage2.results,
      ...movieHighestRatedPage3.results,
    ];
    highestRatedMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    latestMovies = [...movieLatest.results];
    latestMoviesPage2 = [...movieLatestPage2.results];

    upcomingMovies = upcomingMoviesLists.map((item) => {
      if (item.original_language == 'en') {
        return item;
      }
    });
    highestRatedMoviesEn = highestRatedMovies.filter((item) => {
      if (item.original_language == 'en') {
        return item;
      }
    });
    highestRatedMoviesInt = highestRatedMovies.filter((item) => {
      if (item.original_language != 'en') {
        return item;
      }
    });

    latestMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    upcomingMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );

    console.log('🥑🥑🥑');
    console.log('Highest Rated', highestRatedMoviesInt);
    upcomingMovies.splice(12);
  }

  return (
    <div className='mb-12 special'>
      <div className='flex justify-center mt-12 '>
        <ToggleSwitch />
      </div>

      <div className='max-w-full mx-auto mt-14'>
        <Primary_AutoScrollCarousel
          collectionOfMovies={{ latestMovies, upcomingMovies }}
        />
        <hr />
        <Secondary_AutoScrollCarousel
          speed={-0.4}
          latestMovies={latestMovies}
        />
        <hr />
        <Secondary_AutoScrollCarousel
          speed={0.5}
          latestMovies={latestMoviesPage2}
        />
      </div>
      <hr />

      <ItemCarousel highestRatedMovies={highestRatedMoviesEn}/>
      <hr />

      <ItemCarousel highestRatedMovies={highestRatedMoviesInt}/>
      <hr />

      <ItemCarousel />
      <hr />

      {/* <ItemCarousel />
      <hr /> */}
    </div>
  );
};

export default Carousels;
