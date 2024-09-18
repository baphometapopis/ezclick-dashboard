// src/components/FullPageLoader.js

import React from 'react';
import { Logo } from '../Constant/ImageConstant';
import './FullPageLoader.css';

const FullPageLoader = ({ loading, imageSrc ,message}) => {
  return (
    <div className={`loader-overlay ${loading ? 'show' : ''}`}>
      <img src={Logo} alt="Loading..." className="loader-image" />
{message&&      <p>{message}</p>}
    </div>
  );
};

export default FullPageLoader;
