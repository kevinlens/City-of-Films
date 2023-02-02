import React, { useEffect, useState } from 'react';

import ItemCarousel from '../UI/Carousels/ItemCarousel/ItemCarousel';
import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

//CAROUSEL COMPONENTS
import Primary_AutoScrollCarousel from '../UI/Carousels/Primary_AutoScrollCarousel/Primary_AutoScrollCarousel';
import Secondary_AutoScrollCarousel from '../UI/Carousels/Secondary_AutoScrollCarousel/Secondary_AutoScrollCarousel';

//RTK QUERY
import { useFetchLatestMoviesQuery } from '../../store/reduxStore/fetch/fetchApi';

//CONTEXT API
import { useContext } from 'react';
import DateContext from '../../store/contextStore/Date-Context';

const Carousels = () => {
  //CONTEXT API
  const { last30DaysDate, currentDate } = useContext(DateContext);
  const { data: movieLatest } = useFetchLatestMoviesQuery({
    last30DaysDate,
    currentDate,
  });

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if (movieLatest) {
      setHasLoaded(true);
    }
  }, [movieLatest]);

  let latestMovies = '';

  if (hasLoaded) {
    latestMovies = movieLatest.results;

  }

  return (
    <div className='mb-12 special'>
      <div className='flex justify-center mt-12 '>
        <ToggleSwitch />
      </div>

      <div className='max-w-full mx-auto mt-14'>
        <Primary_AutoScrollCarousel collectionOfMovies={latestMovies}/>
        <hr />
        <Secondary_AutoScrollCarousel speed={-0.4} />
        <hr />
        <Secondary_AutoScrollCarousel speed={0.5} />
      </div>
      <hr />

      <ItemCarousel />
      <hr />

      <ItemCarousel />
      <hr />

      <ItemCarousel />
      <hr />

      {/* <ItemCarousel />
      <hr /> */}
    </div>
  );
};

export default Carousels;
