import React from 'react';
//STYLING
import styles from './Spinner.module.css';
const Spinner = () => {
  return (
    <div id={styles.loading_bar_spinner} className={styles.spinner}>
      <div className={styles.spinner_icon}></div>
    </div>
  );
};

export default Spinner;
