import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/story');
  };

  return (
    <div className="mainContent">
      <div className="introContent">
        <h1>Welcome to Drip Drop</h1>
        <p>A real-life based storyline game to educate people towards ground water conservation with multiple exciting features and rewards system</p>
        <button className="getStarted hover:bg-black" onClick={handleButtonClick}>
          Get Started With Story
        </button>
      </div>
    </div>
  );
}

export default Home;
