import React from 'react';
import Select from 'react-select';
import './Dropdown.css';

const Dropdown = ({ label, required, value, onChange, options, placeholder, error, inputClassName, isDisabled }) => {
  const handleChange = (selectedOption) => {
    onChange({ target: { value: selectedOption ? selectedOption.value : null } });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: state.isFocused ? 'none' : 'none', // Remove box shadow only when focused
    }),
  };

  // Ensure that the Select component gets the correct value and clears properly
  const selectValue = options?.find(option => option.value == value || option.label==value) || null;


  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
   
      <Select
        value={selectValue}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        className={`dropdown ${error ? 'error' : ''} ${inputClassName}`}
        styles={customStyles}
        isDisabled={isDisabled}
        isClearable // Make the dropdown clearable

      />
    
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Dropdown;
