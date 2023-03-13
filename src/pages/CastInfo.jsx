//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

//ROUTING
import { useParams } from 'react-router-dom';

//ROUTING
import { Link } from 'react-router-dom';

//RTK QUERY
import {
  useFetchCastDetailsQuery,
  useFetchCastCombinedCreditsQuery,
  useFetchCastImagesQuery,
} from '../store/reduxStore/fetch/fetchCastInfoApi';

//COMPONENTS
import Spinner from '../components/UI/Spinner/Spinner';

const CastInfo = () => {
  const params = useParams();
  const { data: castDetails } = useFetchCastDetailsQuery(params.id);
  const { data: castCombinedCredits } = useFetchCastCombinedCreditsQuery(
    params.id
  );
  const { data: castImages } = useFetchCastImagesQuery(params.id);

  const [hasLoaded, setHasLoaded] = useState(false);

  let summary = '';
  let sideInfo = '';
  let credits = '';
  let previousYear = null;

  useEffect(() => {
    if ((castDetails, castCombinedCredits, castImages)) {
      setHasLoaded(true);
    }
  }, [castDetails, castCombinedCredits, castImages]);

  if (hasLoaded && castCombinedCredits) {
    const {
      also_known_as,
      biography,
      birthday,
      deathday,
      gender,
      known_for_department,
      name,
      place_of_birth,
      profile_path,
    } = castDetails;

    const castCombinedCreditsSorted = [...castCombinedCredits.cast].filter(
      (item) => {
        if (
          item.release_date?.length === 10 ||
          item.first_air_date?.length === 10
        ) {
          return item;
        }
      }
    );
    castCombinedCreditsSorted.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.release_date || b.first_air_date) -
        new Date(a.release_date || a.first_air_date)
      );
    });

    sideInfo = (
      <div className='w-[20%]'>
        <section>
          <img
            className='block h-[4.5rem]'
            onError={(e) => {
              e.currentTarget.src =
                'https://image.tmdb.org/t/p/original/oGUmQBU87QXAsnaGleYaAjAXSlj.jpg';
            }}
            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
          />
        </section>
        <section>
          <h2 className='text-3xl'>Personal Info</h2>
          <h3 className='text-3xl'>Known For</h3>
          <p>{known_for_department || '-'}</p>
          <h3 className='text-3xl'>Known Credits</h3>
          <p>{castCombinedCredits.cast.length || '-'}</p>
          <h3 className='text-3xl'>Gender</h3>
          <p>{gender === 1 ? 'Male' : 'Female'}</p>
          <h3 className='text-3xl'>Birthday</h3>
          <p>{birthday || '-'}</p>
        </section>
      </div>
    );
    summary = (
      <div className='w-[80%] bg-green-400'>
        <h1 className='text-3xl'>{name}</h1>
        <h2 className='text-2xl'>
          Biography
          <p className='text-base'>
            {biography ? biography : "We don't have a biography for Karis Oka."}
          </p>
        </h2>
      </div>
    );

    credits = (
      <div className='w-[80%] bg-white ml-auto mr-0'>
        Acting
        <article className='flex border-2 pt-4 pb-8 mt-4 w-[80%] border-[#E3E3E3] rounded-lg overflow-hidden shadow-smedium'>
          <div className='w-[100%]'>
            {castCombinedCreditsSorted.map((item) => {
              const year = new Date(
                item.release_date || item.first_air_date
              ).getFullYear();
              const shouldAddLineBreak =
                previousYear !== null && year !== previousYear;
              previousYear = year;
              return (
                <Link to={`/details/movies/${item.id}`} key={item.id}>
                  {shouldAddLineBreak && <hr></hr>}
                  <div className='flex'>
                    <p>
                      {item.release_date
                        ? new Date(item.release_date).getFullYear()
                        : new Date(item.first_air_date).getFullYear()}
                    </p>
                    <img
                      className='h-[1rem] self-center'
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg`}
                    />
                    <p>{item.original_title || item.original_name}</p>
                    <p>Played as {item.character}</p>
                  </div>
                  <section>
                    <img
                      className='block h-[4.5rem]'
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://image.tmdb.org/t/p/original/mLwS1TDAyffGSAcppkrs5ymoJYo.jpg';
                      }}
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    />
                  </section>
                </Link>
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <section className='flex'>
        {sideInfo}
        {summary}
        <div></div>
      </section>
      <section>{credits}</section>
    </div>
  );
};

export default CastInfo;
