import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameMenu from './GameMenu.jsx';
import './PlayGame.css';

function PlayGame() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch('/api/check-login');
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    }
    checkLoginStatus();
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="playGameContainer">
      {gameStarted ? (
        <GameMenu />
      ) : (
        <div className="gameOptions">
          <button onClick={handleStartGame} className="playButton">Play</button>
          <button className="resetButton">Reset</button>
          <button className="settingsButton">Settings</button>
        </div>
      )}
      {/* Main game content can be rendered here if needed */}
    </div>
  );
}

export default PlayGame;
