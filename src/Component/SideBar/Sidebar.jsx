// Sidebar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddInspection, Dashboard, ListInspection, Logo, } from '../../Constant/ImageConstant'; // Importing the icons
import './Sidebar.css'; // Importing CSS file for styling

const Sidebar = ({ isOpen }) => {
    const navigate=useNavigate()
    return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    
      <ul className="sidebar-menu">
        <li className="menu-item" onClick={()=>navigate('/')}>
          <img src={Dashboard} alt="Home Icon" className="menu-icon" />
          Dashboard
        </li>
        <li className="menu-item" onClick={()=>navigate('/proposal')}>
          <img src={AddInspection} alt="Home Icon" className="menu-icon"  />
          Add Breakin
        </li>
        <li className="menu-item" onClick={()=>navigate('/proposalList')}>
          <img src={ListInspection} alt="Home Icon" className="menu-icon" />
          Breakin List
        </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
