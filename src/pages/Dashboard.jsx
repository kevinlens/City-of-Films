//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

import { useFetchPopularMoviesForYear2021Query } from '../store/reduxStore/fetch/fetchApi';
import { useFetchPopularMoviesForYear2022Query } from '../store/reduxStore/fetch/fetchApi';

//DATA CHART
import CalendarChart from '../components/UI/DashboardData/CalendarChart/CalendarChart';
import RadarChart from '../components/UI/DashboardData/RadarChart/RadarChart';
import ChoroplethChart from '../components/UI/DashboardData/ChoroplethChart/ChoroplethChart';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const [collectionOfMoviesFor2022, setCollectionOfMoviesFor2022] = useState(
    []
  );
  const [collectionOfMoviesFor2021, setCollectionOfMoviesFor2021] = useState(
    []
  );

  const { data: popularMoviesForYear2022 } =
    useFetchPopularMoviesForYear2022Query();
  const { data: popularMoviesForYear2021 } =
    useFetchPopularMoviesForYear2021Query();

  useEffect(() => {
    if (popularMoviesForYear2021 && popularMoviesForYear2022) {
      getCollectionOfMoviesFor2021();
      getCollectionOfMoviesFor2022();
    }
  }, [popularMoviesForYear2021, popularMoviesForYear2022]);

  const getCollectionOfMovies = async (year, pages) => {
    let totalPages;
    if (pages >= 501) {
      //API LIMIT IS 500 PAGES OR 10,000 ITEMS
      totalPages = 500;
    } else {
      totalPages = pages;
    }

    const fetchTotalPages = async (index, year) => {
      const pageNumber = index + 1;
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=${pageNumber}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31&region=US`
      );
      const movieData = await data.json();
      return movieData;
    };

    const list = await Promise.all(
      Array.from({ length: totalPages }, (_, index) =>
        fetchTotalPages(index, year)
      )
    );

    const entireList = [];

    list.forEach((item) => {
      const reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });
    //API still seems to send back movies with random years so adding
    //extra safety net with a custom year filter
    const rigorouslyFilteredList = entireList.filter((obj) =>
      obj.release_date.startsWith(year)
    );
    rigorouslyFilteredList.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
    return rigorouslyFilteredList;
  };

  const getCollectionOfMoviesFor2021 = async () => {
    const collection = await getCollectionOfMovies(
      '2021',
      popularMoviesForYear2021.total_pages
    );
    setCollectionOfMoviesFor2021(collection);
  };

  const getCollectionOfMoviesFor2022 = async () => {
    const collection = await getCollectionOfMovies(
      '2022',
      popularMoviesForYear2022.total_pages
    );
    setCollectionOfMoviesFor2022(collection);
  };

  return (
    <div className={`${styles.dashboard} pb-20`}>
      <section className='flex items-center place-content-evenly'>
        <ChoroplethChart />
        <RadarChart
          movieCollectionsFor2021={collectionOfMoviesFor2021}
          movieCollectionsFor2022={collectionOfMoviesFor2022}
        />
      </section>
      <CalendarChart
        movieCollectionsFor2021={collectionOfMoviesFor2021}
        movieCollectionsFor2022={collectionOfMoviesFor2022}
      />
    </div>
  );
};

export default Dashboard;
