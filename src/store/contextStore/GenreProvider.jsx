//IMPORTING IN THE ORIGIN OF CONTEXT OBJECT
//React.createContext
//TO USE THE CONTEXT's PROVIDER FEATURE
import GenreContext from './Genre-Context';

//COMPONENT
const GenreProvider = (props) => {

  const movieGenres = {
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ],
  };


  //CONCRETE CONTEXT VALUES TO BE UPDATED OVER TIME
  const genreContext = {
    //values
    movieGenres: movieGenres,
  };

  //COMPONENTS/CHILDREN INSIDE OF THIS PROVIDER WILL
  //HAVE ACCESS TO THE GLOBAL OBJECT
  //PROVIDER IS WHAT MAKES OUR CONTEXT DATA DYNAMIC
  return (
    //passing in our custom context object 'genreContext'
    //that will handle and change the global context origin
    //children elements will be reading from genreContext
    <GenreContext.Provider value={genreContext}>
      {props.children}
    </GenreContext.Provider>
  );
};

export default GenreProvider;