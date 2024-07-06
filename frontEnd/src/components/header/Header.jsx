import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../../assets/logos/CompleteLogo.svg';
// import actionItem1 from '../../assets/action-items/item1.svg';
import actionItem2 from '../../assets/action-items/item2.svg';
import './Header.css';


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <header className="header">
      <img src={headerLogo} alt="Cero Cinco Logo" className='header-logo-image'/>
      <div className='header-action-items-container'>
        {/* <img src={actionItem1} alt="" className='action-item'/> */}
        <img src={actionItem2} alt="boton loguot" className='action-item' onClick={handleLogout}/>
      </div>
    </header>
  );
}

export default Header;