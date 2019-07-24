const maxGuesses = 10;
let numGuesses;
let mysteryNum;
let count;
let rep = document.getElementById("response");
let isPlaying = true;
let attempts = [];
let scores = [];

function generateNum() {
  return Math.floor(Math.random() * 100 + 1);
}

function show(elementId) {
  document.getElementById(elementId).style.display = "inline";
}

function hide(elementId) {
  document.getElementById(elementId).style.display = "none";
}

function newGame() {
  // Reset variables
  mysteryNum = generateNum();
  count = 0;
  numGuesses = maxGuesses;
  isPlaying = true;
  attempts = [];
  // Reset interface
  document.getElementById("high-score").innerHTML = `High Score: ${Math.max(
    ...scores
  )}`;
  document.getElementById("guess").value = "";
  document.getElementById(
    "remaining"
  ).innerHTML = `You have ${numGuesses} turns in total.`;
  document.getElementById("attempts").innerHTML = " ";
  hide("response");
  hide("success");
}

function guess() {
  let num = document.getElementById("guess").value;
  attempts.push(num);
  show("response");
  rep.style.display = "block";

  if (isPlaying) {
    let node = document.createElement("LI");
    let textnode = document.createTextNode(num + " ");
    node.appendChild(textnode);
    document.getElementById("attempts").appendChild(node);

    if (numGuesses > 0) {
      numGuesses -= 1;
      if (num == mysteryNum) {
        isPlaying = false;
        hide("response");
        show("success");
        scores.push(numGuesses);
      } else if (num > mysteryNum) {
        rep.innerHTML = "Your guess is too HIGH. Try again!";
      } else {
        rep.innerHTML = "Your guess is too LOW. Try again!";
      }
    } else {
      rep.innerHTML = `Out of guesses. You LOST! The number is ${mysteryNum}.`;
      isPlaying = false;
    }
  } else {
    hide("success");
    rep.innerHTML = 'The game is over. Press "New Game"!';
  }

  document.getElementById("guess").value = "";
  document.getElementById(
    "remaining"
  ).innerHTML = `You have ${numGuesses} turns remaining.`;
}

document.getElementById("guess").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});

newGame();
