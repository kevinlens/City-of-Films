//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//CONTEXT API
import { useContext } from 'react';
import GenreContext from '../../../../store/contextStore/Genre-Context';

import { ResponsiveRadar } from '@nivo/radar';

const RadarChart = ({ movieCollectionsFor2021, movieCollectionsFor2022 }) => {
  const { movieGenres } = useContext(GenreContext);

  const [collectionOfMoviesFor2022, setCollectionOfMoviesFor2022] = useState();
  const [collectionOfMoviesFor2021, setCollectionOfMoviesFor2021] = useState();
  const [dataForRadarChart, setDataForRadarChart] = useState([
    { genre: 'Action', 2021: 0, 2022: 0 },
    { genre: 'Adventure', 2021: 0, 2022: 0 },
    { genre: 'Animation', 2021: 0, 2022: 0 },
    { genre: 'Comedy', 2021: 0, 2022: 0 },
    { genre: 'Crime', 2021: 0, 2022: 0 },
    { genre: 'Documentary', 2021: 0, 2022: 0 },
    { genre: 'Drama', 2021: 0, 2022: 0 },
    { genre: 'Family', 2021: 0, 2022: 0 },
    { genre: 'Fantasy', 2021: 0, 2022: 0 },
    { genre: 'History', 2021: 0, 2022: 0 },
    { genre: 'Horror', 2021: 0, 2022: 0 },
    { genre: 'Music', 2021: 0, 2022: 0 },
    { genre: 'Mystery', 2021: 0, 2022: 0 },
    { genre: 'Romance', 2021: 0, 2022: 0 },
    { genre: 'Science Fiction', 2021: 0, 2022: 0 },
    { genre: 'TV Movie', 2021: 0, 2022: 0 },
    { genre: 'Thriller', 2021: 0, 2022: 0 },
    { genre: 'War', 2021: 0, 2022: 0 },
    { genre: 'Western', 2021: 0, 2022: 0 },
  ]);

  useEffect(()=>{
    let listOfGenres2021 = [];
    let listOfGenres2022 = [];
    if (movieCollectionsFor2021.length > 0 && movieCollectionsFor2022.length > 0) {
      
      movieCollectionsFor2021.forEach((item) => {
        if(item.genre_ids){
          listOfGenres2021.push(...item.genre_ids);
        }
      });
      movieCollectionsFor2022.forEach((item) => {
        if(item.genre_ids){
          listOfGenres2022.push(...item.genre_ids);
        }
      });
      setCollectionOfMoviesFor2021(listOfGenres2021)
      setCollectionOfMoviesFor2022(listOfGenres2022)
    }
  },[movieCollectionsFor2021, movieCollectionsFor2022])

  useEffect(() => {
    if (collectionOfMoviesFor2021 && collectionOfMoviesFor2022 && movieGenres) {
      const listOfGenresFor2021 = collectionOfMoviesFor2021.map(
        (id) => movieGenres.find((genre) => genre.id === id).name
      );
      const listOfGenresFor2022 = collectionOfMoviesFor2022.map(
        (id) => movieGenres.find((genre) => genre.id === id).name
      );
      let radarChart = [...dataForRadarChart];
      radarChart.map((item, i) =>
        listOfGenresFor2021.filter((genre) => {
          if (genre === item.genre) {
            radarChart[i][2021]++;
          }
        })
      );
      radarChart.map((item, i) =>
        listOfGenresFor2022.filter((genre) => {
          if (genre === item.genre) {
            radarChart[i][2022]++;
          }
        })
      );
      setDataForRadarChart(radarChart);
    }
  }, [collectionOfMoviesFor2021, collectionOfMoviesFor2022, movieGenres]);

  return (
    //! DO NOT REMOVE! This is to artificially initiate chart animation on load
    <div
      className={`-sm:w-[26rem] pt-4 0xl:mt-2 0xl:mx-auto w-[44rem] ${
        dataForRadarChart.length > 1 ? 'h-[36rem]' : 'h-12'
      } `}
    >
      <h1 className='text-center text-3xl'>
        Most Common Movie Genres
      </h1>

      <ResponsiveRadar
        data={dataForRadarChart}
        keys={['2021', '2022']}
        indexBy='genre'
        valueFormat='>-.2f'
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'set2' }}
        blendMode='multiply'
        motionConfig='wobbly'
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RadarChart;
