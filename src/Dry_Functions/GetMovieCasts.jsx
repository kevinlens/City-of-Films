import React from 'react';

const GetMovieCasts = (props, boolean, text) => {
  let casts = [...props];
  //sort all casts by popularity: desc order
  casts.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
  //get only 8 of the most popular casts
  if(!text){
    casts.splice(8);
  } else{
    casts.splice(25);
  }
  //retrieve the casts name
  const castNames = casts.map((item) => {
    return item.name;
  });
  if(boolean){
    return casts
  }else{
    return castNames;
  }
};

export default GetMovieCasts;
