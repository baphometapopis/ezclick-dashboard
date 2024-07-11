import React from 'react';
import './DatePicker.css';

const CustomDatePicker = ({isDisabled, label, required, selectedDate, onChange, startDate, endDate, placeholder, error ,type}) => {
  // Function to add one year to a given date
  const addOneYear = (date) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate.toISOString().substring(0, 10); // Return in YYYY-MM-DD format
  };

  // Handle date change
  const handleDateChange = (event) => {
    const date = event.target.value;
    console.log(date)
    onChange(date);
  };

  // Determine the minDate by adding one year to the provided startDate or use the current date
  const minDate = startDate ? addOneYear(startDate) : new Date().toISOString().substring(0, 10);

  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
      disabled={isDisabled}
        type={type??'date'}
        value={selectedDate || ''}
        onChange={handleDateChange}
        min={minDate}
        max={endDate || ''}
        placeholder={placeholder}
        className={`date-picker ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomDatePicker;
