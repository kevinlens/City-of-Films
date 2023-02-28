import React from 'react';
//IMPORTING IN THE ORIGIN OF CONTEXT OBJECT
//React.createContext
//TO USE THE CONTEXT's PROVIDER FEATURE
import { useState } from 'react';
import FormOfEntertainmentContext from './FormOfEntertainment-Context';

//COMPONENT
const FormOfEntertainmentProvider = (props) => {
  //Must use state and not regular variable
  const [currentFormIsMovies, setCurrentFormIsMovies] = useState(true);

  const setToTVShows = () => {
    setCurrentFormIsMovies((prevState) => !prevState);
  };

  //CONCRETE CONTEXT VALUES TO BE UPDATED OVER TIME
  const formOfEntertainmentContext = {
    //values
    currentFormIsMovies,
    setToTVShows,
  };

  //COMPONENTS/CHILDREN INSIDE OF THIS PROVIDER WILL
  //HAVE ACCESS TO THE GLOBAL OBJECT
  //PROVIDER IS WHAT MAKES OUR CONTEXT DATA DYNAMIC
  return (
    //passing in our custom context object 'DateContext'
    //that will handle and change the global context origin
    //children elements will be reading from dateContext
    <FormOfEntertainmentContext.Provider value={formOfEntertainmentContext}>
      {props.children}
    </FormOfEntertainmentContext.Provider>
  );
};

export default FormOfEntertainmentProvider;
