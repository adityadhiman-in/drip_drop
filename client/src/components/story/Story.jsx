import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './story.css';

const chapters = [
  "Once upon a time, in the quaint village of Lopardi, the sun shone bright and the villagers were content. However, a strange phenomenon started affecting their once fertile lands. The rivers began to dry up and the fields turned barren...",
  "The villagers were bewildered as their once thriving village faced an unusual drought. The once lush fields became dry and cracked, and the streams that used to flow freely now lay stagnant and empty. Despair and uncertainty began to spread among the people...",
  "Amidst this growing panic, a young villager named Aditya returned to the village. Aditya had traveled far and wide, learning about rainwater harvesting. Determined to help his village, Aditya proposed a new way to collect and store rainwater, which could save their crops and bring life back to their lands...",
  "With unwavering resolve, Aditya set up a rainwater harvesting system in the village. He taught the villagers how to build rain barrels and install gutters to collect rainwater. The villagers worked tirelessly alongside Aditya, learning the methods and understanding the importance of water conservation...",
  "Slowly but surely, the village began to see changes. The fields started to regain their green color, and the once-empty streams began to flow again. The villagers were filled with hope and gratitude. The village of Lopardi had survived and flourished once more. Ready to take the challenge and make a difference? Click below to start your adventure and see how you can contribute to saving water!"
];

function Story() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const text = chapters[currentChapter];
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      setDisplayedText(prev => prev + text[index]);
      index += 1;
      if (index > text.length - 1) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [currentChapter]);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePlayClick = () => {
    navigate('/play');
  };

  return (
    <div className="storyContainer">
      <div className="storyContent">
        <h1>Know the Story</h1>
        <div className="chapterContent">
          <p>{displayedText}</p>
        </div>
        <div className="buttonContainer">
          {currentChapter < chapters.length - 1 ? (
            <button className="nextChapter" onClick={handleNextChapter}>Next Chapter</button>
          ) : (
            <button className="playButton" onClick={handlePlayClick}>Play Now</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Story;
