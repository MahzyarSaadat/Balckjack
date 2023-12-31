const startBtn = document.getElementById("start-button");
const messageElement = document.getElementById("message-el");
const sumElement = document.getElementById("sum-el");
const cardElement = document.getElementById("card-el");
const newCard = document.getElementById("newCard-button");
const identifierElement = document.getElementById("identifier-el");
const dealerElement = document.getElementById("dealer-el");
const finishElement = document.getElementById("finish-button");
const resetElement = document.getElementById("reset-button");

let player = {
  name: "mahziar",
  chips: "$145",
};

identifierElement.textContent = player.name + ": " + player.chips;

let cards = [];
let dealerCards = [];

let sum = 0;
let dealerSum = 0;
let hasBalckJack = false;
let isAlive = false;
let message = "";

startBtn.onclick = startGame;
newCard.onclick = drawCard;
finishElement.onclick = finishGame;
resetElement.onclick = reset;

function getRandomValue() {
  let result = Math.floor(Math.random() * 13) + 1;
  if (result >= 11) {
    return 10;
  } else if (result == 1) {
    return 11;
  } else {
    return result;
  }
}

function startGame() {
  if (cards.length >= 2) {
    return;
  }
  let firstCard = getRandomValue();
  let secondCard = getRandomValue();
  let firstDealerCard = getRandomValue();
  let secondDealerCard = getRandomValue();
  dealerSum = firstDealerCard + secondDealerCard;
  dealerCards.push(firstDealerCard, secondDealerCard);
  dealerElement.textContent += firstDealerCard;
  console.log(dealerSum);
  cards.push(firstCard, secondCard);
  sum = firstCard + secondCard;
  isAlive = true;
  rendertGame();
}

function rendertGame() {
  cardElement.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardElement.textContent += cards[i] + " ";
  }

  if (sum <= 20) {
    message = "do you want to draw a new card?";
  } else if (sum === 21) {
    message = "wohoo! you've got balckjack";
    hasBalckJack = true;
    isAlive = false;
  } else {
    message = "sorry! you lose";
    isAlive = false;
  }

  messageElement.textContent = message;
  sumElement.textContent = `Sum: ${sum}`;
}

function drawCard() {
  if (isAlive === true && hasBalckJack === false) {
    let nextCard = getRandomValue();
    cards.push(nextCard);
    sum += nextCard;
    rendertGame();
  }
}

function finishGame() {
  dealerElement.textContent = "Dealer: ";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerElement.textContent += dealerCards[i] + " ";
  }
  if (sum > dealerSum) {
    message = "player win";
  } else if (sum < dealerSum) {
    message = "dealer win";
  } else if (sum == dealerSum) {
    message = "try again";
  }
  messageElement.textContent = message;
  isAlive = false;
}

function reset() {
  location.reload();
}
