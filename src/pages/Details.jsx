import React, { useState, useEffect } from 'react';
import { average } from 'color.js';
import { useParams } from 'react-router-dom';
import {
  useFetchMovieDetailsQuery,
  useFetchMovieReviewsQuery,
  useFetchMovieCreditsQuery,
  useFetchMovieTrailersQuery,
} from '../store/reduxStore/fetch/filmApi';
import { useContext } from 'react';
import GenreContext from '../store/contextStore/Genre-Context';
import GetMovieCasts from '../Dry_Functions/GetMovieCasts';
import GetMovieDirector from '../Dry_Functions/GetMovieDirector';

import ReactMarkdown from 'react-markdown';

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
  //note: some movies may not have ANY REVIEWS!
  const { data: movieReviews } = useFetchMovieReviewsQuery(params.id);
  const { data: movieCredits } = useFetchMovieCreditsQuery(params.id);
  const { data: movieTrailers } = useFetchMovieTrailersQuery(params.id);

  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if ((movieDetails, movieReviews, movieCredits, movieTrailers)) {
      getColor();
      loadData();
    }
  }, [movieDetails, movieReviews, movieCredits, movieTrailers]);

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasColor, setHasColor] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  let summary = '';
  let midSection = '';
  let finalSection = '';
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

    const reviews = movieReviews.results.slice(0, 4);
    const trailers = movieTrailers.results.slice(0, 5);

    for (let genre of movieGenres) {
      movieDetails.genres.map((item) => {
        if (item.id === genre.id) {
          genres.push(genre.name);
        }
      });
    }
    genres.splice(3);

    // console.log('Movie Details', movieDetails);
    console.log('Movie Reviews', reviews);
    console.log('Movie Trailers', trailers);
    // console.log('Movie Genres', movieGenres);
    // console.log('Movie Credits', movieCredits);

    const director = GetMovieDirector(movieCredits.crew);
    const casts = GetMovieCasts(movieCredits.cast, true, 'all');

    const timestamp = '2022-12-16T06:48:15.541Z';
    const dt = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // console.log(new Intl.DateTimeFormat('default', options).format(dt));

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
            <p>
              <b>Director</b>
            </p>
            <p>{director}</p>
          </div>
        </div>
      </div>
    );

    midSection = (
      <div id='container' className='relative flex flex-col my-24 w-[70%]'>
        <h1 className='text-3xl text-gray-900 text-left mb-4'>
          Top Billed Cast
        </h1>

        <ul
          id='scrolling-content'
          className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
        >
          {casts.map((item) => (
            <li className='w-36 mb-8 ml-2 h-72 flex-shrink-0 border-[1px] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'>
              <img
                loading='lazy'
                onError={(e) => {
                  e.currentTarget.src =
                    'https://image.tmdb.org/t/p/w276_and_h350_face/mworc2R4hnmPk6EvogFqoqlVdhD.jpg';
                }}
                src={`https://image.tmdb.org/t/p/w276_and_h350_face/${item.profile_path}`}
              />
              <figcaption className='pt-4 pb-4 px-2'>
                <p className='text-[.9rem]'>
                  <b>{item.name}</b>
                </p>
                <p className='text-sm'>{item.character}</p>
              </figcaption>
            </li>
          ))}
          <div
            className='absolute h-full w-12 right-0'
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)',
            }}
          ></div>
        </ul>

        <div>Full Cast & Crew</div>
        <hr></hr>
        <div className='text-lg'>Reviews</div>
        <div id='container'>
          {reviews.length >= 1 ? (
            reviews.map((item) => {
              return (
                <>
                  <article className='flex border-2 pr-6 pt-4 pb-8 border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'>
                    <section
                      className='ml-2 mr-4 mt-2 h-36'
                      style={{ flex: '0 0 75px' }}
                    >
                      <img
                        className='block rounded-[50%] h-[4.5rem]'
                        loading='lazy'
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://image.tmdb.org/t/p/w185/1kks3YnVkpyQxzw36CObFPvhL5f.jpg';
                        }}
                        src={`https://image.tmdb.org/t/p/w185/${item.author_details.avatar_path}`}
                      />
                    </section>
                    <section>
                      <p>
                        User: {item.author}
                        &nbsp;&nbsp;
                        {Array.from(
                          Array(item.author_details.rating),
                          (e, i) => {
                            return (
                              <img
                                className='w-8 inline pb-2'
                                loading='lazy'
                                onError={(e) => {
                                  e.currentTarget.src =
                                    'https://gravatar.com/avatar/418738537ab04bae411c5001438c99ca?s=400&d=robohash&r=x';
                                }}
                                src={'/assets/images/star.png'}
                              />
                            );
                          }
                        )}
                        &nbsp;&nbsp; ({item.author_details.rating} / 10 Stars)
                      </p>
                      <p className='font-light mb-4'>
                        Written by {item.author} on{' '}
                        <i>
                          {new Intl.DateTimeFormat('default', options).format(
                            dt
                          )}
                        </i>
                      </p>
                      <ReactMarkdown>{item.content}</ReactMarkdown>
                    </section>
                  </article>
                </>
              );
            })
          ) : (
            <section className='text-3xl'>No reviews available :( </section>
          )}
        </div>
        <hr></hr>
      </div>
    );

    const openModal = (src) => {
      setIsModalOpen(true);
      setVideoSrc(src);
    };

    finalSection = (
      <div className='relative flex flex-col my-24 w-[70%]'>
        <ul
          id='scrolling-content'
          className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
        >
          {trailers.map((item) => (
            <div
              className='relative pr-[485px]'
              style={{
                backgroundImage: `url('https://i.ytimg.com/vi/${item.key}/hqdefault.jpg')`,
                width: 533,
                height: 350,
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() =>
                openModal('https://www.youtube.com/embed/LonqJIvAx58')
              }
            ></div>
          ))}
        </ul>
        <div
          className='absolute h-full w-12 right-0'
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)',
          }}
        ></div>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      {summary}
      {midSection}
      {finalSection}
      {isModalOpen && (
        <div
          className='fixed top-0 left-0 bottom-0 right-0'
          style={{ background: 'rgba(0,0,0,0.8)' }}
        >
          <div
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Close
          </div>
          <iframe
            id='if'
            src={videoSrc}
            className='mt-16 mr-auto ml-auto'
            style={{ width: '80%', height: '80%' }}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Summary;
