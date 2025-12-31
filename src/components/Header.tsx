import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-logo">
        <img src="/ADEFClogo.jpg" alt="ADE FC Logo" style={{ height: '60px', verticalAlign: 'middle' }} loading="eager" />
      </div>
      <nav className="header-nav">
        <Link to="/" className="header-link" style={{ color: '#d32f2f' }}>Home</Link>
        <Link to="/contact" className="header-link" style={{ color: '#d32f2f' }}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
