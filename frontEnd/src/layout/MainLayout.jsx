import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout-content">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;