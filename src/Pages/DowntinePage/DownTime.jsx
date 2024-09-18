// src/NotFoundPage.js

import React from 'react';
import './DownTime.css';

export const DownTime = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">503</h1>
      <p className="not-found-message">Server Is Under Maintenance</p>
      <div className="not-found-animation">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

