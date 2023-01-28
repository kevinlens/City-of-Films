import React, { useState, useEffect } from 'react';
import { average } from 'color.js';
import { useParams } from 'react-router-dom';
import {
  useFetchMovieDetailsQuery,
  useFetchMovieReviewsQuery,
  useFetchMovieCreditsQuery,
} from '../store/reduxStore/features/filmApi';
import { useContext } from 'react';
import GenreContext from '../store/contextStore/Genre-Context';

import GetMovieCasts from '../Dry_Functions/GetMovieCasts';
import GetMovieDirector from '../Dry_Functions/GetMovieDirector';

const timeConvert = (n) => {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + 'h ' + rminutes + 'm';
};

const Summary = (props) => {
  // const {  genres} = location.state?.data;
  const { movieGenres } = useContext(GenreContext);
  const params = useParams();
  //immutable
  const {
    data: movieDetails,
    error,
    isLoading,
    isSuccess,
  } = useFetchMovieDetailsQuery(params.id);
  const { data: movieReviews } = useFetchMovieReviewsQuery(params.id);
  const { data: movieCredits } = useFetchMovieCreditsQuery(params.id);

  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if ((movieDetails, movieReviews, movieCredits)) {
      console.log('🥑🥑🥑')
      console.log(movieReviews)
      getColor();
      loadData();
    }
  }, [movieDetails, movieReviews, movieCredits]);

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasColor, setHasColor] = useState([]);

  let summary = '';
  let genres = [];

  const loadData = () => {
    setHasLoaded(true);
  };

  const getColor = async () => {
    const imgColor = await average(
      `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`,
      { amount: 1 }
    );
    setHasColor(imgColor);
  };

  if (hasLoaded && hasColor.length > 1) {
    const {
      overview,
      backdrop_path,
      poster_path,
      release_date,
      title,
      budget,
      revenue,
      runtime,
      vote_average,
      status,
      original_language,
      tagline,
    } = movieDetails;

    for (let genre of movieGenres) {
      movieDetails.genres.map((item) => {
        if (item.id === genre.id) {
          genres.push(genre.name);
        }
      });
    }
    genres.splice(3);

    console.log('Movie Details', movieDetails);
    console.log('Movie Reviews', movieReviews);
    // console.log('Movie Genres', movieGenres);
    // console.log('Movie Credits', movieCredits);

    const director = GetMovieDirector(movieCredits.crew)
    const castNames = GetMovieCasts(movieCredits.cast)

    summary = (
      <div
        className='bg-cover bg-no-repeat bg-[left_calc((50vw-170px)-340px)_top]'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      >
        <div
          className='flex py-12 px-10 text-white'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(${hasColor.toString()}, 1) calc((50vw - 170px) - 340px), rgba(${hasColor.toString()}, 0.84) 30%, rgba(${hasColor.toString()}, 0.84) 100%)`,
          }}
        >
          <img
            className='w-[300px] mr-10 rounded-lg'
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt='Image 2'
          />
          <div>
            <h1>
              {title} ({release_date.slice(0, 4)})
            </h1>
            <p>
              {release_date.split('-').join('/')} &#x2022;
              {genres.join(', ')} &#x2022; {timeConvert(runtime)}
            </p>
            <p>{tagline}</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <p><b>Director</b></p>
            <p>{director}</p>
          </div>
        </div>
      </div>
    );
  }
  return <div>{summary}</div>;
};

export default Summary;
