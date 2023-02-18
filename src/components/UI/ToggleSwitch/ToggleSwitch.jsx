import { useContext } from 'react';
import FormOfEntertainmentContext from '../../../store/contextStore/FormOfEntertainment-Context';
import React, { useState } from 'react';
import styles from './ToggleSwitch.module.css';
const ToggleSwitch = () => {
  const { currentFormIsMovies, setToTVShows } = useContext(
    FormOfEntertainmentContext
  );

  const checkedBox = () => {
    setToTVShows()
  };

  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        checked={currentFormIsMovies ? 'checked' : null}
        onClick={checkedBox}
      ></input>
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
