//IMPORTING IN THE ORIGIN OF CONTEXT OBJECT
//React.createContext
//TO USE THE CONTEXT's PROVIDER FEATURE
import { useEffect, useState } from 'react';
import DateContext from './Date-Context';

//COMPONENT
const DateProvider = (props) => {
  //Must use state and not regular variable
  const [todaysDate, setTodaysDate] = useState([]);
  const [monthsAgoDate, setMonthsAgoDate] = useState([]);
  const [last30DaysDate, setLast30DaysDate] = useState([]);
  
  useEffect(() => {
    getCurrentDate();
    getMonthsAgoDate();
    getLast30DaysDate();
  });

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setTodaysDate(today);
  };
  const getMonthsAgoDate = () => {
    let today = new Date();
    //However many days ago 
    today.setDate(today.getDate() - 120);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setMonthsAgoDate(today);
  };

  const getLast30DaysDate = () => {
    let today = new Date();
    //However many days ago 
    today.setDate(today.getDate() - 30);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setLast30DaysDate(today);
  };

  //CONCRETE CONTEXT VALUES TO BE UPDATED OVER TIME
  const dateContext = {
    //values
    currentDate: todaysDate,
    monthsAgoDate: monthsAgoDate,
    last30DaysDate: last30DaysDate,
  };

  //COMPONENTS/CHILDREN INSIDE OF THIS PROVIDER WILL
  //HAVE ACCESS TO THE GLOBAL OBJECT
  //PROVIDER IS WHAT MAKES OUR CONTEXT DATA DYNAMIC
  return (
    //passing in our custom context object 'DateContext'
    //that will handle and change the global context origin
    //children elements will be reading from dateContext
    <DateContext.Provider value={dateContext}>
      {props.children}
    </DateContext.Provider>
  );
};

export default DateProvider;
