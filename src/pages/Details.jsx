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

//COMPONENTS
import RatingPercentage from '../components/UI/RatingPercentage/RatingPercentage';
import Spinner from '../components/UI/Spinner/Spinner'
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
      movieDetails &&
      movieReviews &&
      movieCredits &&
      movieTrailers &&
      movieRecommendation &&
      movieKeywords
    ) {
      getColor();
      setHasLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [modalFinishedLoading, setModalFinishedLoading] = useState(true);
  const [contentHasLoaded, setContentHasLoaded] = useState(false);
  let summary = '';
  let midSection = '';
  let midSectionAside = '';
  let finalSection = '';
  let genres = [];

  const getColor = async () => {
    const imgColor = await average(
      `http://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
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
    const [year, month, day] = release_date.split('-');
    const outputDate = `${month}-${day}-${year}`;

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

    const director = GetMovieDirector(movieCredits.crew);
    const casts = movieCredits.cast;
    const timestamp = '2022-12-16T06:48:15.541Z';
    const dt = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };

    summary = (
      <div
        className='bg-cover bg-no-repeat bg-[left_calc((50vw-170px)-340px)_top]'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`,
        }}
      >
        <div
          className='-sm:block flex py-12 px-20 text-white '
          style={{
            backgroundImage: `linear-gradient(to right, rgba(${hasColor.toString()}, 1) calc((50vw - 170px) - 340px), rgba(${hasColor.toString()}, 0.84) 30%, rgba(${hasColor.toString()}, 0.84) 100%)`,
          }}
        >
          <img
            className='w-[300px] mr-10 rounded-lg'
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt='Image 2'
          />
          <div className='mt-6'>
            <h1 className='text-4xl'>
              <b>{title} </b>
              <p className='font-thin inline text-slate-300'>
                ({release_date.slice(0, 4)})
              </p>
            </h1>
            <p>
              {outputDate.split('-').join('/')}&nbsp; &#x2022; &nbsp;
              {genres.join(', ')} &#x2022; {timeConvert(runtime)}
            </p>
            <section className='flex pt-4 pb-2 items-center'>
              <div className='w-20'>
              <RatingPercentage rating={vote_average} iconWidth={28} />
              </div>
              <p className='w-2 font-bold pr-16'>User Score</p>
              <img className='w-8 cursor-pointer mr-2 transition-transform duration-200 transform-gpu hover:scale-110' src={'/assets/images/heart.png'} />
              <img className='w-8 cursor-pointer transition-transform duration-200 transform-gpu hover:scale-110' src={'/assets/images/bookmark.png'} />
            </section>
            <p className='text-slate-300'>{tagline}</p>
            <h3 className='text-lg font-bold mb-2'>Overview</h3>
            <p>{overview}</p>
            <p className='text-lg font-bold pt-4'>
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
        className='-sm:w-full -sm:pl-0 relative flex flex-col my-24 w-[75%] pl-16'
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
              <div className='h-44'>
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
        <div className='text-xl pl-2 mb-4'>Full Cast & Crew</div>
        <hr></hr>
        <h3 className='text-3xl mt-6 mb-2'>Media &nbsp;📺</h3>
        <div className='relative flex flex-col mb-8'>
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
        <hr></hr>
        <div className='text-3xl mt-2'>Reviews &nbsp;💬</div>
        <div id='container'>
          {reviews.length >= 1 ? (
            reviews.map((item) => {
              return (
                <>
                  <article className='flex border-2 pr-6 pt-4 pb-8 mt-4 border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'>
                    <section
                      className='ml-2 mr-4 mt-2 h-36'
                      style={{ flex: '0 0 75px' }}
                    >
                      <img
                        className='block rounded-[50%] h-[4.5rem]'
                        loading='lazy'
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://image.tmdb.org/t/p/w64_and_h64_face/1kks3YnVkpyQxzw36CObFPvhL5f.jpg';
                        }}
                        src={`https://image.tmdb.org/t/p/w64_and_h64_face/${item.author_details.avatar_path}`}
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
                                className='w-6 inline pb-2'
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
                        &nbsp;&nbsp; (
                        {item.author_details.rating
                          ? item.author_details.rating
                          : ' n/a'}{' '}
                        / 10 Stars)
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
            <section className='text-xl text-center'>
              No reviews available :(
              <img
                className='w-48 mx-auto mt-4'
                src='/assets/images/empty-box.png'
              />
            </section>
          )}
        </div>
      </div>
    );

    midSectionAside = (
      <aside className='-sm:hidden pl-12 w-[19rem] mt-24'>
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
      <div className='relative flex flex-col w-[75%] pl-16 -mt-12'>
        <hr></hr>
        <section className='flex flex-col mt-8 mb-8'>
          <h1 className='block text-3xl mb-4'>Recommendations &nbsp;🤙</h1>

          <div className='flex overflow-hidden'>
            <ul
              id='scrolling-content'
              className='flex overflow-x-scroll overflow-y-hidden rounded-lg'
            >
              {recommendation.map((item) => (
                <Link
                  to={`/details/movies/${item.id}`}
                  className={`${
                    item.backdrop_path ? 'w-72' : 'w-52'
                  } mb-8 ml-2 h-48 flex-shrink-0 border-[1px] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium`}
                  key={item.id}
                >
                  <img
                    loading='lazy'
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/NotAvailable.png';
                    }}
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  />
                  <p className='pl-2'>{item.title}</p>
                </Link>
              ))}
            </ul>
          </div>
          {recommendation.length === 0 ? (
            <div className='text-center text-xl'>
              No recommendations available :(
              <img
                className='w-48 mx-auto mt-4'
                src='/assets/images/empty-box.png'
              />
            </div>
          ) : (
            ''
          )}
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
          onClick={() => {
            setIsModalOpen(false)
            setModalFinishedLoading(true)
          }}
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
            onLoad={()=>{ setModalFinishedLoading(false)}}
          />
          {modalFinishedLoading == true ? <Spinner /> : ''}
        </div>
      )}
      {!isLoading && !movieDetails ? (
        <div className='relative'>
          <img className='h-full w-full' src='/assets/images/NotFound.jpg' onLoad={()=>{ setContentHasLoaded(true)}} />
          <div className='absolute lg:top-80 -lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white'>
            <p className='text-center text-4xl'>Sooooowie~~~</p>
            <div className=''>
              Not enough data were provided by our third party API :(
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {summary ? '' : contentHasLoaded == false ? (
      <div className='relative py-96'>
      <Spinner />
      </div>) : ''
      }
    </div>
  );
};

export default Summary;
