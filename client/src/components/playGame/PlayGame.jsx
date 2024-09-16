import React, { useState } from 'react';
import GameNavbar from '../../gameComponents/GameNavbar/GameNavbar.jsx';
import './PlayGame.css';

function PlayGame() {
  // Initialize state for the game
  const [game, setGame] = useState(false);

  // Handler for the Play button click
  function handleClick() {
    setGame(true);
  }
 
  return (
    <div className="playGameContainer">
      <div className="gameOptions">
        {/* Render the GameNavbar only if the game state is true */}
        {game && (<GameNavbar/> )}
        
        {/* Conditionally render buttons based on the game state */}
        {!game && (
          <>
            <button onClick={handleClick}  className="settingsButton bg-[#16423C]">Play</button>
            <button onClick={()=>{alert("Game will reset!")}} className="settingsButton">Reset</button>
            <button onClick={()=>{alert("settings will open!")}} className="settingsButton">Settings</button>
          </>
        )}
      </div>
      {/* Main game content can be rendered here if needed */}
    </div>
  );
}

export default PlayGame;








// 033050