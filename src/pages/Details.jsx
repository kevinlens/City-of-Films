import React from 'react';

import { useLocation } from 'react-router-dom';
const Summary = (props) => {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div>
    </div>
  );
};

export default Summary;
