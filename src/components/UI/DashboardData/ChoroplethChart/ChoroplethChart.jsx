//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//* Importing in Chart Component
import { ResponsiveChoropleth } from '@nivo/geo';

//* Necessary Data for Chart Portrayal
import { mockGeographyData as data } from './ChoroplethData';
import countries from './world_countries.json';

//RTK QUERY
import { useFetchPopularTVShowsAiredIn2022Query } from '../../../../store/reduxStore/fetch/fetchTVShowsApi';

const ChoroplethChart = () => {
  let countryData = [...data];
  const [collectionOfTVShows, setCollectionOfTVShows] = useState();
  const [adjustedCountriesData, setAdjustedCountriesData] = useState([]);
  const { data: popularTVShowsAiredIn2022 } =
    useFetchPopularTVShowsAiredIn2022Query();

  useEffect(() => {
    if (popularTVShowsAiredIn2022) {
      getCollectionOfTVShowsFor2022();
    }
  }, [popularTVShowsAiredIn2022]);

  useEffect(() => {
    if (collectionOfTVShows && popularTVShowsAiredIn2022) {
      adjustCountryData();
    }
  }, [collectionOfTVShows]);

  const adjustCountryData = () => {
    const updatedFirstArray = countryData.map((obj) => {
      if (collectionOfTVShows.includes(obj.id.slice(0, 2))) {
        return {
          ...obj,
          value: collectionOfTVShows.filter((id) => id === obj.id.slice(0, 2))
            .length,
        };
      } else {
        return obj;
      }
    });
    setAdjustedCountriesData(updatedFirstArray);
  };

  const getCollectionOfTVShowsFor2022 = async () => {
    let totalPages = popularTVShowsAiredIn2022.total_pages;

    const fetchTotalPages = async (index) => {
      let pageNumber = index + 1;
      // * Fetching data from pages between 5 / 12
      let data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=${pageNumber}&first_air_date.gte=2022-01-01&first_air_date.lte=2022-12-31`
      );
      let tvData = await data.json();
      return tvData;
    };

    // * fetches all url at once as each url is limited to 20 array elements
    const list = await Promise.all(
      Array.from({ length: totalPages }, (_, index) => fetchTotalPages(index))
    );

    let entireList = [];
    let listOfOriginCountry = [];
    // * merge all array elements
    list.forEach((item) => {
      let reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });
    //API still seems to send back movies with random years so adding 
    //extra safety net with a custom year filter
    const rigorouslyFilteredList = entireList.filter(obj => obj.first_air_date.startsWith(2022));
    rigorouslyFilteredList.forEach((item) => {
      listOfOriginCountry.push(item.origin_country[0]);
    });
    setCollectionOfTVShows(listOfOriginCountry);
  };

  return (
    <ResponsiveChoropleth
      data={adjustedCountriesData}
      features={countries.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors='nivo'
      domain={[0, 300]}
      unknownColor='#666666'
      label='properties.name'
      valueFormat='.2s'
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor='#dddddd'
      borderWidth={0.5}
      borderColor='#152538'
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
        {
          id: 'gradient',
          type: 'linearGradient',
          colors: [
            {
              offset: 0,
              color: '#000',
            },
            {
              offset: 100,
              color: 'inherit',
            },
          ],
        },
      ]}
      fill={[
        {
          match: {
            id: 'CAN',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'CHN',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'ATA',
          },
          id: 'gradient',
        },
      ]}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: 'left-to-right',
          itemTextColor: '#444444',
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000000',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ChoroplethChart;
