// Header.js

import React from 'react';
import { isMobile } from 'react-device-detect';
import {  useNavigate } from 'react-router-dom';
import { Logo, Logout, Menu } from '../../Constant/ImageConstant';
import './Header.css'; // Importing CSS file for styling

const Header = ({ toggleSidebar }) => {
const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
    window.location.reload();


  }

  return (
    <header className="app-header">
    { isMobile && <div className="menu-icon" onClick={toggleSidebar}>
    <img src={Menu}  alt='Menu' style={{height:'40px',width:'50px'}}/>      
      </div>}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div onClick={handleLogout} style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer'}}>
      <p style={{color:'red'}}>Logout</p>
      <img src={Logout}  alt='Menu' style={{height:'40px',width:'40px'}}/>
      </div>
    </header>
  );
};

export default Header;
