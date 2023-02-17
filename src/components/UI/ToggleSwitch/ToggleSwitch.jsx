import { useContext } from 'react';
import FormOfEntertainmentContext from '../../../store/contextStore/FormOfEntertainment-Context';
import React, { useState } from 'react';
import styles from './ToggleSwitch.module.css';
const ToggleSwitch = () => {
  const { currentFormIsMovies, setToTVShows } = useContext(
    FormOfEntertainmentContext
  );
  const [isChecked, setIsChecked] = useState(true);

  const checkedBox = () => {
    console.log('---------------1', currentFormIsMovies)
    //for UI purposes
    setIsChecked((isChecked) => !isChecked);
    setToTVShows()
    console.log('---------------2', currentFormIsMovies)
  };

  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        checked={isChecked ? 'checked' : null}
        onClick={checkedBox}
      ></input>
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
