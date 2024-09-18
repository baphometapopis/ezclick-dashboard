import React from 'react';
import './DatePicker.css';

const CustomDatePicker = ({
  isDisabled,
  label,
  required,
  selectedDate,
  onChange,
  startDate,
  endDate,
  placeholder,
  error,
  type
}) => {
  // Handle date change
  const handleDateChange = (event) => {
    const date = event.target.value;
    onChange(date);
  };

  // Function to get Indian Standard Time (IST) formatted as yyyy-MM-dd or yyyy-MM-ddThh:mm for datetime-local type
  const getISTDateString = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
    const istDate = new Date(now.getTime() + istOffset);
    return type === 'datetime-local'
      ? istDate.toISOString().substring(0, 16)
      : istDate.toISOString().substring(0, 10);
  };

  // Determine the minDate and maxDate based on the type
  const minDate = type === 'datetime-local' ? getISTDateString() : '';
  const maxDate = getISTDateString();

  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        disabled={isDisabled}
        type={type ?? 'date'}
        value={selectedDate || ''}
        onChange={handleDateChange}
        min={minDate}
        max={maxDate}
        placeholder={placeholder}
        className={`date-picker ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomDatePicker;
