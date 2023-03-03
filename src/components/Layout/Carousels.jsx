import React, { useEffect, useState } from 'react';

import ItemCarousel from '../UI/Carousels/ItemCarousel/ItemCarousel';
import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

import DuplicatesExterminator from '../../Dry_Functions/DuplicatesExterminator';

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
  useFetchPopularMoviesQuery,
  useFetchPopularMoviesPage2Query,
  useFetchHighestRatedPage3Query,
} from '../../store/reduxStore/fetch/fetchApi';
import {
  useFetchTopRatedTVShowsQuery,
  useFetchTopRatedTVShowsPage2Query,
  useFetchTopRatedTVShowsPage3Query,
  useFetchPopularTVShowsPage5Query,
  useFetchPopularTVShowsPage6Query,
} from '../../store/reduxStore/fetch/fetchTVShowsApi';
//CONTEXT API
import { useContext } from 'react';
import DateContext from '../../store/contextStore/Date-Context';
import FormOfEntertainmentContext from '../../store/contextStore/FormOfEntertainment-Context';

const Carousels = () => {
  //CONTEXT API
  const { last60DaysDate, currentDate, lastDecadeDate } =
    useContext(DateContext);
  const { currentFormIsMovies } = useContext(FormOfEntertainmentContext);

  //RTK QUERIES FOR MOVIES
  const { data: movieLatest } = useFetchLatestMoviesQuery({
    last60DaysDate,
    currentDate,
  });
  const { data: movieLatestPage2 } = useFetchLatestMoviesPage2Query({
    last60DaysDate,
    currentDate,
  });
  const { data: moviePopular } = useFetchPopularMoviesQuery();
  const { data: moviePopularPage2 } = useFetchPopularMoviesPage2Query();
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
  //RTK QUERIES FOR TV SHOWS
  const { data: topRatedTVShows } = useFetchTopRatedTVShowsQuery();
  const { data: topRatedTVShowsPage2 } = useFetchTopRatedTVShowsPage2Query();
  const { data: topRatedTVShowsPage3 } = useFetchTopRatedTVShowsPage3Query();
  const { data: popularTVShowsPage5 } = useFetchPopularTVShowsPage5Query();
  const { data: popularTVShowsPage6 } = useFetchPopularTVShowsPage6Query();

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);
  const [collectionOfTVShows, setCollectionOfTVShows] = useState([]);
  useEffect(() => {
    getCollectionOfTVShows();
    //all to avoid unnecessary rerenders
    if (
      movieLatest &&
      movieLatestPage2 &&
      movieUpcoming &&
      moviePopular &&
      movieHighestRated &&
      collectionOfTVShows
    ) {
      setHasLoaded(true);
    }
  }, [movieLatest, movieLatestPage2, movieUpcoming, currentFormIsMovies]);

  const getCollectionOfTVShows = async () => {
    //! DO NOT CHANGE, needed here for the display of Primary Carousel
    //! Primary Carousel will also have a sorted by Popularity list
    let totalPages = 7;

    const fetchTotalPages = async (index) => {
      let pageNumber = index + 4;
      // * Fetching data from pages between 5 / 12
      let data = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=${pageNumber}`
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
    setCollectionOfTVShows(entireList);
  };

  let latestMovies,
    latestMoviesPage2,
    latestMoviesData,
    latestMoviesPage2Data,
    upcomingMovies,
    highestRatedMoviesEn,
    highestRatedMoviesInt,
    upcomingMoviesLists,
    popularMovies = '';

  if (hasLoaded) {
    //need to declare a separate function here in order to filter for movies in English
    let highestRatedMovies;
    if (currentFormIsMovies) {
      popularMovies = [...moviePopular.results, ...moviePopularPage2.results];
      highestRatedMovies = [
        ...movieHighestRated.results,
        ...movieHighestRatedPage2.results,
        ...movieHighestRatedPage3.results,
      ];
      let filteredUpcomingMovies = [...movieUpcoming.results];
      //get rid of duplicate movies through original title instead of IDs because IDs are unreliable
      upcomingMoviesLists =  [...new Map(filteredUpcomingMovies.map(item => [item.original_title, item])).values()];
      latestMovies = [...movieLatest.results];
      latestMoviesPage2 = [...movieLatestPage2.results];
      latestMovies.sort(
        (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
      );
    } else {
      //due to the fact that I didn't document my original problem, I can't
      //seem to figure out whether or not I overcomplicated this function
      //as it's now very hard to replicate the original bug
      let pureTVShowData = DuplicatesExterminator(collectionOfTVShows);
      let curatedTVShows = [...pureTVShowData];
      popularMovies = [...popularTVShowsPage5.results];
      highestRatedMovies = [
        ...topRatedTVShows.results,
        ...topRatedTVShowsPage2.results,
        ...topRatedTVShowsPage3.results,
      ];
      upcomingMoviesLists = [...curatedTVShows];
      let moviesLatest = [...curatedTVShows];
      let moviesLatestPage2 = [...curatedTVShows];

      latestMoviesData = moviesLatest.slice(16, 30);
      latestMoviesPage2Data = moviesLatestPage2.slice(30, 55);
    }

    highestRatedMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );

    upcomingMovies = upcomingMoviesLists.filter((item) => {
      if (item.original_language == 'en' && item.name !== 'PAW Patrol') {
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

    upcomingMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    popularMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    upcomingMovies.splice(16);

    //remove any duplicates coming from Primary Carousels
    if (!currentFormIsMovies) {
      latestMovies = latestMoviesData.filter(
        (element) =>
          !upcomingMovies.includes(element) && !(element.name === 'BEASTARS')
      );
      latestMoviesPage2 = latestMoviesPage2Data.filter(
        (element) => !upcomingMovies.includes(element)
      );
    }
  }

  return (
    <div className='mb-12 special'>
      <div className='flex justify-center mt-12 '>
        <ToggleSwitch />
      </div>

      <div className='max-w-full mx-auto mt-14'>
        <Primary_AutoScrollCarousel
          collectionOfMovies={{ latestMovies, upcomingMovies }}
          currentFormIsMovies={currentFormIsMovies}
        />
        <hr />
        <Secondary_AutoScrollCarousel
          speed={-0.4}
          latestMovies={latestMovies}
          currentFormIsMovies={currentFormIsMovies}
        />
        <h1 className='flex text-white text-5xl justify-center'>
          {currentFormIsMovies ? 'Latest Movies' : 'Commonly TV Shows'}
        </h1>
        <Secondary_AutoScrollCarousel
          speed={0.5}
          latestMovies={latestMoviesPage2}
          currentFormIsMovies={currentFormIsMovies}
        />
      </div>
      <hr />

      <ItemCarousel
        highestRatedMovies={highestRatedMoviesEn}
        title={
          currentFormIsMovies
            ? 'Highest Rated of the Decade'
            : 'Highest Rated (North America)'
        }
        currentFormIsMovies={currentFormIsMovies}
      />
      <hr />

      <ItemCarousel
        highestRatedMovies={highestRatedMoviesInt}
        title={
          currentFormIsMovies
            ? 'Highest Rated of the Decade (International)'
            : 'Highest Rated (International)'
        }
        currentFormIsMovies={currentFormIsMovies}
      />
      <hr />

      <ItemCarousel
        highestRatedMovies={popularMovies}
        title={
          currentFormIsMovies
            ? 'Popular Movies'
            : 'Popular TV Shows'
        }
        currentFormIsMovies={currentFormIsMovies}
      />
      <hr />

      {/* <ItemCarousel />
      <hr /> */}
    </div>
  );
};

export default Carousels;
