import React from 'react';
import ItemCarousel from '../UI/ItemCarousel/ItemCarousel';
import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';
import Primary_AutoScrollCarousel from '../UI/Primary_AutoScrollCarousel/Primary_AutoScrollCarousel';
import Secondary_AutoScrollCarousel from '../UI/Secondary_AutoScrollCarousel/Secondary_AutoScrollCarousel';
const Carousels = () => {
  return (
    <div className='mb-12'>
      <div className='flex justify-center mt-12 '>
        <ToggleSwitch />
      </div>

      <div className='max-w-full mx-auto mt-14'>
        <Primary_AutoScrollCarousel />
        <hr />
        <Secondary_AutoScrollCarousel speed={-0.4} />
        <hr />
        <Secondary_AutoScrollCarousel speed={0.5} />
      </div>
      <hr />

      <ItemCarousel />
      <hr />

      <ItemCarousel />
      <hr />

      <ItemCarousel />
      <hr />

      {/* <ItemCarousel />
      <hr /> */}
    </div>
  );
};

export default Carousels;
