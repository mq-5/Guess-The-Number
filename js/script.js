const maxGuesses = 10;
let numGuesses;
let mysteryNum;
let count;
let rep = document.getElementById("response");
let isPlaying = true;

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
  mysteryNum = generateNum();
  count = 0;
  numGuesses = maxGuesses;
  isPlaying = true;
  document.getElementById("guess").value = "";
  document.getElementById("h2").innerText = "Let's Start!";
  document.getElementById(
    "remaining"
  ).innerHTML = `You have ${numGuesses} turns in total.`;
  hide("response");
  hide("success");
  console.log(mysteryNum);
}

function guess() {
  let num = document.getElementById("guess").value;
  document.getElementById("h2").innerText = "Your guess was " + num;
  show("response");
  rep.style.display = "block";
  if (isPlaying) {
    if (numGuesses > 0 && isPlaying) {
      numGuesses -= 1;
      if (num == mysteryNum) {
        isPlaying = false;
        hide("response");
        show("success");
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
