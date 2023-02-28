import React from 'react';

const DuplicatesExterminator = (arr1) => {
  let curatedTVShows;
  let movieIDs = arr1.map((item) => {
    return item.id;
  });
  // * 1
  //Set objects are collections of values. A value in the Set may only occur once
  //Returns a boolean of true/false
  const hasDuplicates = (arr) => {
    return new Set(arr).size !== arr.length;
  };
  // * 2
  //We use this when duplicates existence has been confirmed, and we create a new array from Set Object
  const removeDuplicates = (array) => {
    return [...new Set(array)];
  };
  // * 3
  // * (duplicateFreeArray, your original lists)
  // get only elements that don't already exists in our duplicateFreeArray
  const matchArrays = (arr1, arr2) => {
    const matchedObjects = [];
    arr2.forEach((obj) => {
      // * "!matchedObjects.some(o => o.id === obj.id)" ensures that the object(id) doesn't already
      // * exists within our array
      if (
        arr1.includes(obj.id) &&
        !matchedObjects.some((o) => o.id === obj.id)
      ) {
        matchedObjects.push(obj);
      }
    });
    return matchedObjects;
  };
  
  if(hasDuplicates(movieIDs)){
    let pureTVShowsData = removeDuplicates(movieIDs);
    curatedTVShows = matchArrays(pureTVShowsData, arr1);

  }else{
    return arr1
  }

  return curatedTVShows;
};

export default DuplicatesExterminator;
