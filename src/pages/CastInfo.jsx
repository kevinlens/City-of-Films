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
    if (castDetails && castCombinedCredits && castImages) {
      setHasLoaded(true);
    }
  }, [castDetails, castCombinedCredits, castImages]);

  if (hasLoaded && castCombinedCredits && castDetails) {
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

    console.log('---------------', castDetails);

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
      <div>
        <section>
          <img
            loading='lazy'
            className='block h-[28rem] rounded-lg'
            onError={(e) => {
              e.currentTarget.src =
                'https://image.tmdb.org/t/p/w500/oGUmQBU87QXAsnaGleYaAjAXSlj.jpg';
            }}
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
          />
        </section>
        <section>
          <h2 className='text-2xl mt-6 mb-2'>Personal Info</h2>
          <div className='mb-3'>
            <h3 className='text-lg font-medium'>Known For</h3>
            <p>{known_for_department || '-'}</p>
          </div>
          <div className='mb-3'>
            <h3 className='text-lg font-medium'>Known Credits</h3>
            <p>{castCombinedCredits.cast.length || '-'}</p>
          </div>
          <div className='mb-3'>
            <h3 className='text-lg font-medium'>Gender</h3>
            <p>{gender === 1 ? 'Male' : 'Female'}</p>
          </div>
          <div className='mb-3'>
            <h3 className='text-lg font-medium'>Birthday</h3>
            <p>{birthday || '-'}</p>
          </div>
        </section>
      </div>
    );
    summary = (
      <div>
        <h1 className='text-3xl font-semibold pb-8'>{name}</h1>
        <h2 className='text-2xl'>
          Biography
          <p className='text-base pt-2 -sxl:pl-4 pr-16' style={{ whiteSpace: 'pre-wrap' }}>
            {biography ? biography : `We don't have a biography for ${name}`}
          </p>
        </h2>
      </div>
    );

    credits = (
      <div>
        <article className='flex border-2 pt-4 pb-8 mt-12 w-[95%] border-[#E3E3E3] rounded-sm overflow-hidden shadow-smedium'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-[100%] '>
            {castCombinedCreditsSorted.map((item) => {

              // const year = new Date(
              //   item.release_date || item.first_air_date
              // ).getFullYear();
              // const shouldAddLineBreak =
              //   previousYear !== null && year !== previousYear;
              // previousYear = year;
              
              return (
                <Link to={`/details/movies/${item.id}`} key={item.id}>

                  <div>
                  <p className='block text-center'>
                        {item.release_date
                          ? new Date(item.release_date).getFullYear()
                          : new Date(item.first_air_date).getFullYear()}
                      </p>
                    <div className='flex text-center justify-center'>
                      {/* <img
                      loading='lazy'
                      className='h-[1rem] px-4'
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg`}
                    /> */}
                      <p className='font-medium'>
                        {item.original_title || item.original_name}

                      {item.character ? (
                        <p className='pl-2'>
                          <p className='text-[#898989] inline pr-1'>as</p>{' '}
                          <p className='inline font-extralight'>
                            {item.character}
                          </p>
                        </p>
                      ) : (
                        ''
                      )}
                      </p>
                    </div>

                    <section className='pb-8 pt-2 flex justify-center'>
                      <img
                        loading='lazy'
                        className='block h-64'
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://image.tmdb.org/t/p/w500/mLwS1TDAyffGSAcppkrs5ymoJYo.jpg';
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      />
                    </section>
                  </div>

                  {/* <hr className='w-48 border-1 border-black mx-auto mb-8'></hr> */}
                </Link>
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className='pt-12 bg-white ml-auto mr-0'>
      <section className='sxl:flex'>
        <div className='sxl:w-[25%] pl-10 bg-white -sxl:justify-center -sxl:flex -sxl:text-center -sxl:mb-12'>{sideInfo}</div>
        <div className='sxl:w-[75%] text-[#000000] pl-4 pb-12'>
          {summary}
          {credits}
        </div>
      </section>
    </div>
  );
};

export default CastInfo;
