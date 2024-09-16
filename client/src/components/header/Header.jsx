import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch login status from backend
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        console.log(data)
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error('Error fetching login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <header>
      <div className="logo">
        <Link to="/" aria-label="Go to homepage">
          <h1>Drip Drop</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" aria-label="Go to Home page">Home</Link>
          </li>
          <li>
            <Link to="/play" aria-label="Go to Play page">Play</Link>
          </li>
          <li>
            <Link to="/story" aria-label="Go to Story page">Story</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/dashboard" aria-label="Go to Dashboard">Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/login" aria-label="Go to Login page">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
