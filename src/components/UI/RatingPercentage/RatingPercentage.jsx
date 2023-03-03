import React from 'react';

const RatingPercentage = ({ rating }) => {
  const movieRating = Math.round(rating * 10);
  return (
    <>
      <div className='flex-wrapper w-44'>
        <div className='single-chart'>
          <svg viewBox='0 0 36 36' className={`circular-chart ${movieRating >= 70 ? 'green' : movieRating >= 50 ? 'yellow' : 'red'}`}>
            <path
              className={movieRating >= 70 ? 'circle-bg-green' : movieRating >= 50 ? 'circle-bg-yellow' : 'circle-bg-red'}
              d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
            />
            <path
              className='circle'
              strokeDasharray={`${movieRating}, 100`}
              d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
            />
            <text x='18' y='20.35' className='percentage'>
              {movieRating}%
            </text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default RatingPercentage;
