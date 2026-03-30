import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/globals.css';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up or at top
      if (currentScrollY < lastScrollYRef.current || currentScrollY < 50) {
        setIsNavVisible(true);
      } 
      // Hide nav when scrolling down past 50px
      else if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        setIsNavVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isNavVisible ? 'nav-visible' : 'nav-hidden'}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/Logo.png" alt="ZeroOne Courses" className="logo-image" />
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>
              📚 Courses
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={isActive('/gallery') ? 'active' : ''}>
              🎨 Gallery
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              ℹ️ About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
              📞 Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
