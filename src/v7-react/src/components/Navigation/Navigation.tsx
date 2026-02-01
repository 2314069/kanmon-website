import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const navLinks = [
  { to: '/', label: 'Top' },
  { to: '/program', label: 'Program' },
  { to: '/classroom', label: 'Classroom' },
  { to: '/info', label: 'Info' },
  { to: '/edist', label: 'Edist' },
  { to: '/interbooking', label: 'Interbooking' },
  { to: '/apply', label: 'Apply' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="nav nav-solid" role="navigation" aria-label="メインナビゲーション">
        <Link to="/" className="nav-logo">感門之盟</Link>

        <div className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-label="モバイルメニュー"
      >
        <button className="mobile-menu-close" aria-label="メニューを閉じる" onClick={closeMenu}>
          &times;
        </button>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigation;
