import React from 'react';
import './GameMenu.css';

function GameMenu() {
  return (
    <div className="gameMenu">
      <div className="menuItem">
        <span className="menuLabel">Water Coins:</span>
        <span className="menuValue">100</span> {/* Replace with dynamic value */}
      </div>
      <div className="menuItem">
        <span className="menuLabel">Level:</span>
        <span className="menuValue">1</span> {/* Replace with dynamic value */}
      </div>
      <div className="menuItem">
        <button className="logoutButton">Logout</button>
      </div>
      <div className="menuItem">
        <button className="quizButton">Quiz of the Day</button>
      </div>
      <div className="menuItem">
        <button className="eventsButton">Events</button>
      </div>
      <div className="menuItem">
        <button className="adsButton">Watch Ads for More Coins</button>
      </div>
    </div>
  );
}

export default GameMenu;
