import React from 'react';
//IMPORTING IN THE ORIGIN OF CONTEXT OBJECT
//React.createContext
//TO USE THE CONTEXT's PROVIDER FEATURE
import { useState } from 'react';

import LoadingCompleteContext from './LoadingComplete-Context';

//COMPONENT
const LoadingCompleteProvider = (props) => {

  //Must use state and not regular variable
  const [loadingComplete, setLoadingComplete] = useState(false);

  const setLoadedToTrue = () => {
    setLoadingComplete(true);
  };

  //CONCRETE CONTEXT VALUES TO BE UPDATED OVER TIME
  const loadingCompleteContext = {
    //values
    loadingComplete,
    setLoadedToTrue,
  };
  //COMPONENTS/CHILDREN INSIDE OF THIS PROVIDER WILL
  //HAVE ACCESS TO THE GLOBAL OBJECT
  //PROVIDER IS WHAT MAKES OUR CONTEXT DATA DYNAMIC
  return (
    //passing in our custom context object 'DateContext'
    //that will handle and change the global context origin
    //children elements will be reading from dateContext
    <LoadingCompleteContext.Provider value={loadingCompleteContext}>
      {props.children}
    </LoadingCompleteContext.Provider>
  );
};

export default LoadingCompleteProvider;
