import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛒 ShopEase</Link>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
        <button onClick={() => { handleLogout(); setMenuOpen(false); }}>
          Logout
        </button>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'rotate-top' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'hide' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'rotate-bottom' : ''}`}></div>
      </div>
    </header>
  );
};

export default Header;
