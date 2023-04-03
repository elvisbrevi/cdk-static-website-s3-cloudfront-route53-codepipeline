import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="header-nav">
      <div className={`header-menu ${windowWidth <= 768 ? 'responsive' : ''}`}>
        <p id="title" className='anton-font'>Elvis Brevi</p>
        <Link to="/">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/mini-projects">Mini Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
