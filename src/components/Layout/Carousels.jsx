import React from 'react';
import ItemCarousel from '../UI/ItemCarousel/ItemCarousel';
import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';
import Primary_AutoScrollCarousel from '../UI/Primary_AutoScrollCarousel/Primary_AutoScrollCarousel';
import Secondary_AutoScrollCarousel from '../UI/Secondary_AutoScrollCarousel/Secondary_AutoScrollCarousel';
const Carousels = () => {
  return (
    <div>
      <div className='flex justify-center mb-12 mt-6'>
        <ToggleSwitch />
      </div>
      <ItemCarousel />
      <ItemCarousel />
      <div className='max-w-full mx-auto mt-24'>
        <Primary_AutoScrollCarousel />
        <Secondary_AutoScrollCarousel speed={-.4} />
        <Secondary_AutoScrollCarousel speed={.5} />
      </div>
    </div>
  );
};

export default Carousels;