// Sidebar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddInspection, Dashboard, ListInspection, Logo, UpdateDatabase, } from '../../Constant/ImageConstant'; // Importing the icons
import './Sidebar.css'; // Importing CSS file for styling

const Sidebar = ({ isOpen }) => {
    const navigate=useNavigate()
    return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    
      <ul className="sidebar-menu">
        <li className="menu-item" onClick={()=>navigate('/EzDashboard')}>
          <img src={Dashboard} alt="Home Icon" className="menu-icon" />
          Dashboard
        </li>
        <li className="menu-item" onClick={()=>navigate('/EzDashboard/proposal')}>
          <img src={AddInspection} alt="Ad Breakin Icon" className="menu-icon"  />
          Add Breakin
        </li>
        <li className="menu-item" onClick={()=>navigate('/EzDashboard/proposalList')}>
          <img src={ListInspection} alt="Breakin List Icon" className="menu-icon" />
          Breakin List
        </li>
        <li className="menu-item" onClick={()=>navigate('/EzDashboard/UpdateList')}>
          <img src={UpdateDatabase} alt="Database Icon" className="menu-icon" />
          Update List
        </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
