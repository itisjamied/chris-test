document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "cyan",
    "magenta",
    "lime",
    "orange",
    "teal",
  ];

  let cards = [...colors, ...colors]; // Duplicate colors for matching pairs
  let selectedCards = []; // empty array for selected cards

  //shuffling function
  function shuffle(originalArray) {
    let array = [...originalArray]; // Copy the original array to avoid modifying it
    let shuffledArray = []; // Initialize an empty array to hold the shuffled elements

    while (array.length > 0) {
      const randomIndex = Math.floor(Math.random() * array.length); // Pick a random index (math.ranom(0-1) but * length -> (0-length))
      shuffledArray.push(array[randomIndex]); // Add the randomly selected element to the new array
      array.splice(randomIndex, 1); // Remove the element from the temporary array
    }

    return shuffledArray; // Return the shuffled array
  }

  // Initialize game board
  function initGame() {
    cards = shuffle(cards); // Update cards array with shuffled array

    for (let i = 0; i < cards.length; i++) {
      // create card element
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.color = cards[i]; // sets a custom data attribute  of color (use to check if cards match)
      // create front face
      const frontFace = document.createElement("div");
      frontFace.classList.add("face", "front");
      // create backface
      const backFace = document.createElement("div");
      backFace.classList.add("face", "back");
      backFace.style.backgroundColor = cards[i]; // sets the background color style to a color in array
      // append both to card
      card.appendChild(frontFace);
      card.appendChild(backFace);
      // call flipcard function when card is clicked
      card.addEventListener("click", flipCard);
      //append to gameboard
      gameBoard.appendChild(card);
    }
  }

  // Flip card function
  function flipCard() {
    // less than two cards are selected, card isn't already flipped
    if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
      //give card flipped class
      this.classList.add("flipped");
      // push to array
      selectedCards.push(this);
      // if two cards are selected
      if (selectedCards.length === 2) {
        //check for match
        checkForMatch();
      }
    }
  }

  // Check for match function
  function checkForMatch() {
    // assign slected cards to card 1 and card 2
    const [card1, card2] = selectedCards;
    // if card colors match
    if (card1.dataset.color === card2.dataset.color) {
      // Cards match
      setTimeout(() => {
        //remove lostener
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        //add matched class
        card1.classList.add("matched"); // Optional: Add a matched class
        card2.classList.add("matched"); // Optional: Add a matched class

        // Reset selectedCards
        selectedCards = [];
        checkForWin(); // Check if the player has won after matching cards
      }, 1000);
    }
    //if they don't match
    else {
      // Cards do not match
      setTimeout(() => {
        //remove flipped class
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");

        // Reset selectedCards
        selectedCards = [];
      }, 1000);
    }
  }

  function checkForWin() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".matched");

    if (allCards.length === matchedCards.length) {
      displayWinScreen();
    }
  }

  function displayWinScreen() {
    const winOverlay = document.createElement("div");
    winOverlay.classList.add("win-overlay");
    winOverlay.textContent = "Congratulations! You've won!";
    document.body.appendChild(winOverlay);

    // Optional: Add an event listener to the overlay to remove it on click
    winOverlay.addEventListener("click", () => {
      document.body.removeChild(winOverlay);
    });
  }

  initGame();
});
