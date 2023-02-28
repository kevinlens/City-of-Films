import React from 'react';

const GetMovieDirector = (props) => {
  let directorsData = props.filter((item) => {
    // item.department === 'Directing' wasn't working as intended for TV
    if (item.known_for_department === 'Directing') {
      return item;
    }
  });

  directorsData.sort(
    (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
  );

  directorsData.splice(1);
  const director = directorsData.map((item) => {
    return item.name;
  });

  return director;
};

export default GetMovieDirector;
