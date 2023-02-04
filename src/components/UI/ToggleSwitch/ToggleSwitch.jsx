import { useState } from 'react';
import styles from './ToggleSwitch.module.css';
const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(true);
  const checkedBox = () => {
    setIsChecked((isChecked) => !isChecked);
  };
  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        checked={isChecked ? 'checked' : null}
        onClick={checkedBox}
        readOnly
      ></input>
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
