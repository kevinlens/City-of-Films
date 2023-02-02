//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//REACT 3RD PARTY PACKAGE
import ReactMarkdown from 'react-markdown';
import { average } from 'color.js';

//ROUTING
import { useParams } from 'react-router-dom';

//RTK QUERY
import {
  useFetchMovieDetailsQuery,
  useFetchMovieReviewsQuery,
  useFetchMovieCreditsQuery,
  useFetchMovieTrailersQuery,
  useFetchMovieRecommendationQuery,
  useFetchMovieKeywordsQuery,
} from '../store/reduxStore/fetch/fetchApi';

//CONTEXT API
import { useContext } from 'react';
import GenreContext from '../store/contextStore/Genre-Context';

//DRY FUNCTIONS
import GetMovieCasts from '../Dry_Functions/GetMovieCasts';
import GetMovieDirector from '../Dry_Functions/GetMovieDirector';

//Convert movie screen time to readable hours
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
  const { data: movieKeywords } = useFetchMovieKeywordsQuery(params.id);
  const { data: movieRecommendation } = useFetchMovieRecommendationQuery(
    params.id
  );

  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if (
      (movieDetails,
      movieReviews,
      movieCredits,
      movieTrailers,
      movieRecommendation,
      movieKeywords)
    ) {
      getColor();
      setHasLoaded(true);
    }
  }, [
    movieDetails,
    movieReviews,
    movieCredits,
    movieTrailers,
    movieRecommendation,
    movieKeywords,
  ]);

  //should always watch out for the state as it will sometimes
  //cause unwanted rerenders if unwatched for
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasColor, setHasColor] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  let summary = '';
  let midSection = '';
  let midSectionAside = '';
  let finalSection = '';
  let genres = [];

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
    const recommendation = movieRecommendation.results.slice(0, 5);
    const keywords = movieKeywords.keywords;
    for (let genre of movieGenres) {
      movieDetails.genres.map((item) => {
        if (item.id === genre.id) {
          genres.push(genre.name);
        }
      });
    }
    genres.splice(3);

    // console.log('Movie Details', movieDetails);
    console.log('🍉🍉🍉');
    console.log(vote_average);
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
      <div
        id='container'
        className='relative flex flex-col my-24 w-[75%] pl-16'
      >
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

    midSectionAside = (
      <aside className='pl-12 w-[19rem] mt-24'>
        <section>
          <div className='mb-4'>
            <p className='font-extrabold'>Status</p>
            <p>{status}</p>
          </div>
          <div className='mb-4'>
            <p className='font-extrabold'>Original Language</p>
            <p>
              {original_language.charAt(0).toUpperCase() +
                original_language.slice(1)}
            </p>
          </div>
          <div className='mb-4'>
            <p className='font-extrabold'>Budget</p>
            <p>
              {budget != '0' ? '$' + budget.toLocaleString('en-US') : 'N/A'}
            </p>
          </div>
          <div className='mb-4'>
            <p className='font-extrabold'>Revenue</p>
            <p>
              {revenue != '0' ? '$' + revenue.toLocaleString('en-US') : 'N/A'}
            </p>
          </div>
        </section>
        <section>
          <p className='font-extrabold'>Keywords</p>
          <div className='flex flex-wrap'>
            {keywords.map((item) => {
              return (
                <p className='bg-[#e5e5e5] text-[.90rem] font-semibold font-sourceSansProLight  mr-[4.5px] my-[2.5px] px-2 py-[4px] rounded border  border-[#d7d7d7]'>
                  {item.name}
                </p>
              );
            })}
          </div>
        </section>
      </aside>
    );

    const openModal = (src) => {
      setIsModalOpen(true);
      setVideoSrc(src);
    };

    finalSection = (
      <div className='relative flex flex-col w-[75%] pl-16'>
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
                openModal(`https://www.youtube.com/embed/${item.key}`)
              }
            >
              <button className='absolute bg-black opacity-75 w-[4.5rem] h-[4.5rem] rounded-full ml-[40%] mt-[29%]'>
                <img
                  src='/assets/svg/playButton.svg'
                  className='invert ml-[0.7rem] w-14'
                />
              </button>
            </div>
          ))}
        </ul>
        <div
          className='absolute h-full w-12 right-0'
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)',
          }}
        ></div>
        <section className='flex flex-col'>
          <h1 className='block'>Recommendations</h1>
          <div className='flex overflow-hidden'>
            <ul
              id='scrolling-content'
              className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
            >
              {recommendation.map((item) => (
                <li className='w-72 mb-8 ml-2 h-48 flex-shrink-0 border-[1px] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'>
                  <img
                    loading='lazy'
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://image.tmdb.org/t/p/original/mworc2R4hnmPk6EvogFqoqlVdhD.jpg';
                    }}
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  />
                  <p className='pl-2'>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className='bg-white font-sourceSansProRegular'>
      {summary}
      <section className='flex'>
        {midSection}
        {midSectionAside}
      </section>
      {finalSection}
      {isModalOpen && (
        <div
          className='fixed top-0 left-0 bottom-0 right-0'
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 95,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <img
              className='h-8 w-8 rounded-full invert'
              src='/assets/images/closeButton.png'
            />
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
