import React from 'react';
import styled from 'styled-components';

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 44px;
`;

const Slider = styled.span`
  position: absolute;
//   cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.checked ? '#2A2D41' : '#EDF2F4')};
  transition: 0.4s;
  border-radius: 4px;

  &:before {
    position: absolute;
    content: '';
    height: 35px;
    width: 70px;
    left: 34px;
    bottom: 4px;
    background-color:white ;
    transition: 0.4s;
    border-radius: 4px;
    transform: ${props => (props.checked ? 'translateX(90px)' : 'translateX(-30px)')};
  }
`;

const Label = styled.span`
  position: absolute;
  top: 50%;
  left: ${props => (props.checked ? '10px' : '100px')};
  transform: translateY(-50%);
  font-size: 14px;
  color: ${props => (props.checked ? 'white' : '#2A2D41')};
  pointer-events: none;
  transition: 0.4s;
`;

const ToggleSwitch = ({ isChecked, onChange,label,option1,option2 }) => {
  return (
    <div style={{marginBottom:'10px'}}>
    <label>
    {label} {true && <span style={{color:'red'}}>*</span>}
  </label>
    <Switch onClick={onChange}>
        
      <Slider checked={isChecked} />
      <Label checked={isChecked}>{isChecked ? option1 : option2}</Label>
    </Switch>
    </div>
  );
};

export default ToggleSwitch;