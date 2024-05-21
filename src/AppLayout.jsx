// AppLayout.js

import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

import './AppLayout.css'; // Importing CSS file for styling
import Header from './Component/Header/Header';
import Sidebar from './Component/SideBar/Sidebar';

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile?false: true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="app-layout">

      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
