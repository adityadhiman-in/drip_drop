document.addEventListener("DOMContentLoaded", () => {
  const bucket = document.getElementById("bucket");
  const dropsContainer = document.getElementById("drops-container");
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");

  let score = 0;
  let gameInterval;
  let dropInterval;
  let bucketPosition = 50; // Center position of bucket

  // Start Game
  startBtn.addEventListener("click", startGame);

  function startGame() {
    score = 0;
    updateScore();
    startBtn.disabled = true;

    // Start game intervals
    gameInterval = setInterval(createDrop, 1000); // Drops every 1 second
    dropInterval = setInterval(moveDrops, 30); // Moves drops every 30ms

    // Add keyboard event listeners for bucket movement
    document.addEventListener("keydown", moveBucket);
  }

  function endGame() {
    clearInterval(gameInterval);
    clearInterval(dropInterval);
    startBtn.disabled = false;
    document.removeEventListener("keydown", moveBucket);
    alert(`Game Over! Your score: ${score}`);
    resetGame();
  }

  function resetGame() {
    dropsContainer.innerHTML = ""; // Remove all drops
    bucketPosition = 50; // Reset bucket to center
    bucket.style.left = `${bucketPosition}%`;
  }

  // Create a new water drop
  function createDrop() {
    const drop = document.createElement("div");
    drop.classList.add("water-drop");
    drop.style.left = `${Math.floor(Math.random() * 90)}%`; // Random x position
    dropsContainer.appendChild(drop);
  }

  // Move bucket with arrow keys
  function moveBucket(event) {
    const step = 5; // Bucket movement step size

    if (event.key === "ArrowLeft" && bucketPosition > 0) {
      bucketPosition -= step;
    } else if (event.key === "ArrowRight" && bucketPosition < 90) {
      bucketPosition += step;
    }
    bucket.style.left = `${bucketPosition}%`;
  }

  // Move each drop downwards and check for collision or miss
  function moveDrops() {
    const drops = document.querySelectorAll(".water-drop");

    drops.forEach((drop) => {
      const currentTop = parseFloat(window.getComputedStyle(drop).top);

      if (currentTop >= 90) {
        if (isCaught(drop)) {
          score += 10;
          updateScore();
          drop.remove();
        } else {
          drop.remove();
          endGame(); // Ends the game if a drop is missed
        }
      } else {
        drop.style.top = `${currentTop + 2}%`;
      }
    });
  }

  // Check if a drop is caught by the bucket
  function isCaught(drop) {
    const dropRect = drop.getBoundingClientRect();
    const bucketRect = bucket.getBoundingClientRect();

    return (
      dropRect.bottom >= bucketRect.top &&
      dropRect.left >= bucketRect.left &&
      dropRect.right <= bucketRect.right
    );
  }

  // Update score display
  function updateScore() {
    scoreDisplay.textContent = score;
  }
});
