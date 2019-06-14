
const EASY_STARTING_TIME = 60;
var easyWin = 0;
var easyLoss = 0;
var gameOver = false;
var easyRemainingTime = 0;
var delayHandle = null;
var timerHandle = null;

var givenPairsEasy = [
  {
    letter: "a",
    image: "img/e11.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "b",
    image: "img/e12.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "c",
    image: "img/e13.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "d",
    image: "img/e14.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "e",
    image: "img/e21.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "f",
    image: "img/e22.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "g",
    image: "img/e23.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "h",
    image: "img/e24.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "a",
    image: "img/e31.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "b",
    image: "img/e32.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "c",
    image: "img/e33.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "d",
    image: "img/e34.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "e",
    image: "img/e41.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "f",
    image: "img/e42.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "g",
    image: "img/e43.jpg",
    imageback: "img/paw.png"
  },
  {
    letter: "h",
    image: "img/e44.jpg",
    imageback: "img/paw.png"
  }
];
var currentBoardEasy = {
  e11: null,
  e12: null,
  e13: null,
  e14: null,
  e21: null,
  e22: null,
  e23: null,
  e24: null,
  e31: null,
  e32: null,
  e33: null,
  e34: null,
  e41: null,
  e42: null,
  e43: null,
  e44: null,
}
var easyPicsGuessed = {
  e11: false,
  e12: false,
  e13: false,
  e14: false,
  e21: false,
  e22: false,
  e23: false,
  e24: false,
  e31: false,
  e32: false,
  e33: false,
  e34: false,
  e41: false,
  e42: false,
  e43: false,
  e44: false
}
var openedPicsEasy =[];
var guessedPicsEasy = [];
var guessesLength = 0;
var unpairedGuesses = [];

//DOM References:
var easyTimerText;
var easyGameMessage;
var easyStartGameBttn;
var easyPlayNewGameBttn;
var gridBoxEasy;


  