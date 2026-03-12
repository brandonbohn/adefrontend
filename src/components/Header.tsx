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
        <Link to="/" className="header-link">Home</Link>
        <Link to="/donate" className="header-link">Donate</Link>
        <Link to="/sponsor-a-girl" className="header-link">Sponsor a Girl</Link>
        <Link to="/contact" className="header-link">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
