const cardValues = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
const totalPairs = cardValues.length / 2;

// Shuffle the card values
const shuffle = () => {
  for (let i = cardValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
  }
};

// Create card elements and add to the game board
const createBoard = () => {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  shuffle();

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
};

// Handle card flip
const flipCard = function () {
  if (lockBoard || this === firstCard) return;

  this.textContent = this.dataset.value;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }
};

// Check for a match
const checkForMatch = () => {
  moves++;
  document.getElementById("moveCounter").textContent = moves;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    matches++;
    resetBoard();
    if (matches === totalPairs) {
      gameCompleted();
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
};

// Game completed function
const gameCompleted = () => {
  alert("Congratulations! You've completed the game.");
  updateCoins(10); // Update the coins (example: 10 coins for completion)
  document.getElementById("playAgainButton").style.display = "block";
};

// Update coins function (mock function, replace with actual implementation)
const updateCoins = (coins) => {
  // Replace with actual implementation (e.g., update via API call)
  console.log(`Coins updated: ${coins}`);
};

// Reset the board
const resetBoard = () => {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
};

// Reset game button
document.getElementById("resetButton").addEventListener("click", () => {
  moves = 0;
  matches = 0;
  document.getElementById("moveCounter").textContent = moves;
  document.getElementById("playAgainButton").style.display = "none";
  createBoard();
});

// Play again button
document.getElementById("playAgainButton").addEventListener("click", () => {
  moves = 0;
  matches = 0;
  document.getElementById("moveCounter").textContent = moves;
  createBoard();
  document.getElementById("playAgainButton").style.display = "none";
});

// Initialize the game
createBoard();
