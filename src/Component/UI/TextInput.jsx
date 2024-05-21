// TextInput.js

import React from 'react';
import './TextInput.css'

const TextInput = ({ label, required, value, onChange, placeholder, error, inputClassName,isDisabled }) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-input ${error ? 'error' : ''} ${inputClassName}`}
        disabled={isDisabled}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextInput;
