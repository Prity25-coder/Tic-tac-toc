console.log("Welcome to Tic toc toe");
let music = new Audio("./asset/audio/music.mp3");
let audioTurn = new Audio("./asset/audio/ting.mp3");
let gameOver = new Audio("./asset/audio/gameover.mp3");
let winningSound1 = new Audio("./asset/audio/winningSound1.mp3");
let turn = "X";
let isGameOver = false;
let totalClick = 0;
let winner = false;

// function to change for a turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

document.getElementsByClassName("info")[0].style.color = "red";

// function to check for a win
const checkWin = () => {
  let boxTexts = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxTexts[e[0]]?.innerText === boxTexts[e[1]]?.innerText &&
      boxTexts[e[1]]?.innerText === boxTexts[e[2]]?.innerText &&
      boxTexts[e[0]]?.innerText !== ""
    ) {
      winner = true;
      document.querySelector(".info").innerText = `${
        boxTexts[e[0]].innerText
      } won`;
      isGameOver = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";

      document.querySelector(".line").style.width = "30vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      winningSound1.play();
    }
  });
};

// game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    // music.play();
    if (boxText.innerText === "" && !isGameOver) {
      boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      totalClick++;
      if (totalClick === 9 && winner === false) {
        gameOver.play();
        isGameOver = true;
        document.getElementsByClassName("info")[0].innerText = "Match drawn";
      }
      if (!isGameOver) {
        document.getElementsByClassName(
          "info"
        )[0].innerText = `Turn for ${turn}`;
      }
    }
  });
});

// adding onclick event listener to reset button
reset.addEventListener("click", () => {
  music.pause();
  let boxTexts = document.querySelectorAll(".boxText");
  Array.from(boxTexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isGameOver = false;
  document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  document.querySelector(".line").style.width = "0vw";
  totalClick = 0;
  winner = false;
});
