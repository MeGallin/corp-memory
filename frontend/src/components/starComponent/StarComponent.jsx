import React from 'react';
import './StarComponent.scss';

import { FaStar } from 'react-icons/fa';

const StarComponent = () => {
  return (
    <span className="start-component-wrapper">
      <FaStar />
    </span>
  );
};

export default StarComponent;
