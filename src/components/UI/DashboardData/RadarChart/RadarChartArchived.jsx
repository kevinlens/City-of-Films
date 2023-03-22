//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

//RTK QUERY
import { useFetchPopularMoviesForYear2022Query } from '../../../../store/reduxStore/fetch/fetchApi';
import { useFetchPopularMoviesForYear2021Query } from '../../../../store/reduxStore/fetch/fetchApi';

//CONTEXT API
import { useContext } from 'react';
import GenreContext from '../../../../store/contextStore/Genre-Context';

const RadarChartArchived = () => {
  const { movieGenres } = useContext(GenreContext);

  const [collectionOfMoviesFor2022, setCollectionOfMoviesFor2022] = useState();
  const [collectionOfMoviesFor2021, setCollectionOfMoviesFor2021] = useState();

  const [dataForRadarChart2022, setDataForRadarChart2022] = useState([]);
  const [dataForRadarChart2021, setDataForRadarChart2021] = useState([]);

  const { data: popularMoviesForYear2022 } =
    useFetchPopularMoviesForYear2022Query();
  const { data: popularMoviesForYear2021 } =
    useFetchPopularMoviesForYear2021Query();

  const data = {
    labels: [
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'History',
      'Horror',
      'Music',
      'Mystery',
      'Romance',
      'Science Fiction',
      'TV Movie',
      'Thriller',
      'War',
      'Western',
    ],
    datasets: [
      {
        label: '2021',
        data: dataForRadarChart2021,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '2022',
        data: dataForRadarChart2022,
        borderColor: 'rgb(144, 238, 144)',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (popularMoviesForYear2022 && popularMoviesForYear2021) {
      getCollectionOfMoviesFor2021();
      getCollectionOfMoviesFor2022();
    }
  }, [popularMoviesForYear2022, popularMoviesForYear2021]);

  useEffect(() => {
    if (collectionOfMoviesFor2022 && collectionOfMoviesFor2021 && movieGenres) {
      const listOfGenresFor2021 = collectionOfMoviesFor2021.map(
        (id) => movieGenres.find((genre) => genre.id === id).name
      );
      const listOfGenresFor2022 = collectionOfMoviesFor2022.map(
        (id) => movieGenres.find((genre) => genre.id === id).name
      );
      const dataFor2021 = getDataForRadarChart(listOfGenresFor2021);
      const dataFor2022 = getDataForRadarChart(listOfGenresFor2022);

      setDataForRadarChart2021(dataFor2021);
      setDataForRadarChart2022(dataFor2022);
    }
  }, [collectionOfMoviesFor2022, collectionOfMoviesFor2021, movieGenres]);

  const getDataForRadarChart = (arr) => {
    //spread operator and target a specific property and a sum value (if it's been added before)
    //else assign a value of zero and add one value to it. This is all through the works
    //of key-value pairs
    const counts = arr.reduce(
      (acc, genre) => ({ ...acc, [genre]: (acc[genre] || 0) + 1 }),
      {}
    );

    //loop through genres array (which is in the correct order) and use it's order
    //to organize our counts array using it's key-value pair
    //if it's value doesn't exist then assign it to zero
    const result = movieGenres.map((genre) => counts[genre.name] || 0);
    return result;
  };

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
        `/.netlify/functions/fetch-movies?startingParams=${'movie/popular'}&categoryParams=${'credits'}&id=${id}&gte=${`${year}-01-01`}&lte${`${year}-12-31`}&page=${pageNumber}`
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
    const listOfGenres = [];

    list.forEach((item) => {
      const reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });

    entireList.forEach((item) => {
      listOfGenres.push(...item.genre_ids);
    });

    return listOfGenres;
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
    <div className='w-[36rem]'>
      <h1 className='text-center text-3xl'>
        Most Popular Genres for Movies of 2022
      </h1>
      <Radar data={data} />
    </div>
  );
};

export default RadarChartArchived;
