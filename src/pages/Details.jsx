import React, { useState, useEffect } from 'react';
import { average } from 'color.js';
import { useFetchMovieDetailsQuery, useFetchMovieReviewsQuery } from '../store/reduxStore/features/filmApi';
import { useLocation } from 'react-router-dom';
const Summary = (props) => {

  const location = useLocation();
  const {item, casts, director, genres} = location.state?.data;
  
  useEffect(()=>{
    getColor();
  },[])
  
  //immutable
  const { data: additionalMovieDetails, error, isLoading, isSuccess } = useFetchMovieDetailsQuery(item.id);
  const { data: movieReviews} = useFetchMovieReviewsQuery(item.id);
  const [hasColor,setHasColor] = useState([]);

  const getColor = async()=>{
    const imgColor = await average(`https://image.tmdb.org/t/p/original/${item.poster_path}`, {amount: 1,})
    setHasColor(imgColor)
  }


  let summary = '';

  if (hasColor.length && additionalMovieDetails) {
    console.log('😃😃😃')
    console.log(item);
    console.log(additionalMovieDetails)
    console.log(movieReviews.results)
    summary = (
      <div
        className='bg-cover bg-no-repeat bg-[left_calc((50vw-170px)-340px)_top]'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
        }}
      >
        <div
          className='flex py-12 pl-10'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(${hasColor.toString()}, 1) calc((50vw - 170px) - 340px), rgba(${hasColor.toString()}, 0.84) 30%, rgba(${hasColor.toString()}, 0.84) 100%)`,
          }}
        >
          <img
            className='w-[300px] rounded-lg'
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt='Image 2'
          />
          <div>
            <h1 >{item.title} ({item.release_date.slice(0,4)})</h1>
          </div>
        </div>
      </div>
    );
  }
  return <div>{summary}</div>;
};

export default Summary;
