// Header.js

import React from 'react';
import { isMobile } from 'react-device-detect';
import {  useNavigate } from 'react-router-dom';
import { AndroidApk, Logo, Logout, Menu } from '../../Constant/ImageConstant';
import './Header.css'; // Importing CSS file for styling

const Header = ({ toggleSidebar }) => {
const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
    window.location.reload();


  }

  const downloadApk = () => {
    const url = process.env.PUBLIC_URL + "/SampleFile/app-release.apk";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "EzclickManual.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="app-header">
    { isMobile && <div className="menu-icon" onClick={toggleSidebar}>
    <img src={Menu}  alt='Menu' style={{height:'40px',width:'50px'}}/>      
      </div>}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer'}}>
      <img src={AndroidApk} onClick={downloadApk} alt="Logo" style={{height:'45px',width:'45px',marginRight:'10px'}} />

      <p onClick={handleLogout} style={{color:'red'}}>Logout</p>
      <img src={Logout}  alt='Menu' style={{height:'40px',width:'40px'}}/>
      </div>
    </header>
  );
};

export default Header;
