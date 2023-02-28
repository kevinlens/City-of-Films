//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//REACT 3RD PARTY PACKAGE
import ReactMarkdown from 'react-markdown';
import { average } from 'color.js';

//ROUTING
import { useParams } from 'react-router-dom';

//ROUTING
import { Link } from 'react-router-dom';

//RTK QUERY
import {
  useFetchTVShowDetailsQuery,
  useFetchTVShowReviewsQuery,
  useFetchTVShowCreditsQuery,
  useFetchTVShowTrailersQuery,
  useFetchTVShowKeywordsQuery,
  useFetchTVShowRecommendationsQuery,
} from '../store/reduxStore/fetch/fetchTVShowsApi';
//CONTEXT API

//DRY FUNCTIONS
import GetMovieDirector from '../Dry_Functions/GetMovieDirector';

const DetailsTVShows = () => {

  const params = useParams();
  //immutable

  //note: some movies may not have ANY REVIEWS!
  const { data: tvShowTrailers } = useFetchTVShowTrailersQuery(params.id);
  const { data: tvShowKeywords } = useFetchTVShowKeywordsQuery(params.id);
  const { data: tvShowRecommendations } = useFetchTVShowRecommendationsQuery(
    params.id
    );
    const { data: tvShowCredits } = useFetchTVShowCreditsQuery(params.id);
  const { data: tvShowDetails } = useFetchTVShowDetailsQuery(params.id);
  const { data: tvShowReviews } = useFetchTVShowReviewsQuery(params.id);
  useEffect(() => {
    //all three to avoid unnecessary rerenders
    if (
      tvShowDetails &&
      tvShowReviews &&
      tvShowCredits &&
      tvShowTrailers &&
      tvShowRecommendations &&
      tvShowKeywords
    ) {
      console.log('🍌🍌🍌🍌🍌', tvShowDetails);
      getColor();
      setHasLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tvShowDetails,
    tvShowReviews,
    tvShowCredits,
    tvShowTrailers,
    tvShowRecommendations,
    tvShowKeywords,
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
      `http://image.tmdb.org/t/p/w500/${tvShowDetails.poster_path}`,
      { amount: 1 }
    );
    setHasColor(imgColor);
  };

  if (hasLoaded && hasColor.length > 1) {
    const {
      overview,
      backdrop_path,
      poster_path,
      first_air_date,
      name,
      budget,
      revenue,
      runtime,
      vote_average,
      status,
      original_language,
      tagline,
    } = tvShowDetails;

    const reviews = tvShowReviews.results.slice(0, 4);
    const trailers = tvShowTrailers.results.slice(0, 5);
    const recommendation = tvShowRecommendations.results.slice(0, 5);
    const keywords = [...tvShowKeywords.results];
    tvShowDetails.genres.map(item=>{
      genres.push(item.name)
    })

    // console.log('Movie Details', tvShowDetails);

    // console.log('Movie Credits', tvShowCredits);

    const director = GetMovieDirector(tvShowCredits.crew);
    // const casts = GetMovieCasts(tvShowCredits.cast, true, 'all');
    const casts = tvShowCredits.cast;
    const timestamp = '2022-12-16T06:48:15.541Z';
    const dt = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // console.log(new Intl.DateTimeFormat('default', options).format(dt));

    summary = (
      <div
        className='bg-cover bg-no-repeat bg-[left_calc((50vw-170px)-340px)_top]'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div
          className='flex py-12 px-10 text-white'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(${hasColor.toString()}, 1) calc((50vw - 170px) - 340px), rgba(${hasColor.toString()}, 0.84) 30%, rgba(${hasColor.toString()}, 0.84) 100%)`,
          }}
        >
          <img
            loading='lazy'
            className='w-[300px] mr-10 rounded-lg'
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt='Image 2'
          />
          <div>
            <h1>
              {name} ({first_air_date.slice(0, 4)})
            </h1>
            <p>
              {first_air_date.split('-').join('/')}&nbsp;  &#x2022; &nbsp; 
              {genres.join(', ')}
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
            <Link
              to={`/cast/${item.id}`}
              className='w-36 mb-8 ml-2 h-72 flex-shrink-0 border-[1px] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'
              key={item.id}
            >
              <div className='h-44 '>
                <img
                  loading='lazy'
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg';
                  }}
                  src={`https://image.tmdb.org/t/p/w276_and_h350_face/${item.profile_path}`}
                />
              </div>
              <figcaption className='pt-4 pb-4 px-2'>
                <p className='text-[.9rem]'>
                  <b>{item.name}</b>
                </p>
                <p className='text-sm'>{item.character}</p>
              </figcaption>
            </Link>
          ))}
          <div
            className='absolute h-full w-12 right-0'
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)',
            }}
          ></div>
        </ul>

        <div className='relative flex flex-col'>
          <ul
            id='scrolling-content'
            className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
          >
            {trailers.map((item) => (
              <div
                key={item.id}
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
                    loading='lazy'
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
        </div>

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
                          Array(Math.round(item.author_details.rating)),
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
              {/* {original_language.charAt(0).toUpperCase() +
                original_language.slice(1)} */}
              {original_language.toUpperCase()}
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
        <section className='flex flex-col'>
          <h1 className='block'>Recommendations</h1>
          <div className='flex overflow-hidden'>
            <ul
              id='scrolling-content'
              className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
            >
              {recommendation.map((item) => (
                <li
                  className='w-72 mb-8 ml-2 h-48 flex-shrink-0 border-[1px] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'
                  key={item.id}
                >
                  <img
                    loading='lazy'
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://image.tmdb.org/t/p/original/mworc2R4hnmPk6EvogFqoqlVdhD.jpg';
                    }}
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  />
                  <p className='pl-2'>{item.name}</p>
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
              loading='lazy'
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

export default DetailsTVShows;
