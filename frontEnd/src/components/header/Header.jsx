import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src="\src\assets\logos\CompleteLogo.svg" alt="Cero Cinco Logo" className='header-logo-image'/>
      <div className='header-action-items-container'>
        <img src="\src\assets\action-items\item1.svg" alt="" className='action-item'/>
        <img src="\src\assets\action-items\item2.svg" alt="" className='action-item'/>
      </div>
    </header>
  );
}

export default Header;