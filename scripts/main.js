
import RunGamePlayers from "./modules/gamePlayers.js";
import RunGame  from './modules/gameAI.js';


document.addEventListener('DOMContentLoaded', () => {
  // Get modal element
  const modal = document.getElementById('modeSelectionModal');

  // Get "Start Game" button
  const startGameButton = document.getElementById('startGameButton');

  // Listen for button click event
  startGameButton.addEventListener('click', () => {
    // Get the selected game mode
    const gameMode = document.querySelector('input[name="gameMode"]:checked').value;

    // Close the modal
    modal.classList.remove('is-active');

    // Start the game based on the selected mode
    if (gameMode === "ai") {
      RunGame();
    } else if (gameMode === "player") {
    RunGamePlayers();
    }
  });


  // Show the modal when the page loads
  modal.classList.add('is-active');
});

