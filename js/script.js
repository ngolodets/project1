
const EASY_STARTING_TIME = 60;
var easyWin = 0;
var easyLoss = 0;
var gameOver = false;
var easyRemainingTime = 0;
//var easyDelayHandle = null;
var easyTimerHandle = null;
//var picsFlipped = 0;
picsInPlayEasy = [];

//images for the game:
var givenPairsEasy = [
  {
    letter: "a",
    image: "img/e11.jpg"
  },
  {
    letter: "b",
    image: "img/e12.jpg"
  },
  {
    letter: "c",
    image: "img/e13.jpg"
  },
  {
    letter: "d",
    image: "img/e14.jpg"
  },
  {
    letter: "e",
    image: "img/e21.jpg"
  },
  {
    letter: "f",
    image: "img/e22.jpg"
  },
  {
    letter: "g",
    image: "img/e23.jpg"
  },
  {
    letter: "h",
    image: "img/e24.jpg"
  },
  {
    letter: "i",
    image: "img/e31.jpg"
  },
  {
    letter: "j",
    image: "img/e32.jpg"
  },
  {
    letter: "k",
    image: "img/e33.jpg"
  },
  {
    letter: "l",
    image: "img/e34.jpg"
  },
  {
    letter: "m",
    image: "img/e41.jpg"
  },
  {
    letter: "n",
    image: "img/e42.jpg"
  },
  {
    letter: "o",
    image: "img/e43.jpg"
  },
  {
    letter: "p",
    image: "img/e44.jpg"
  }
];
//console.log(easyPicSelection);

//create an array holding pairs of images for the game:
//var givenPairsEasy = easyPicSelection.concat(easyPicSelection);
console.log(givenPairsEasy);

//shuffle the array
//Fisher-Yates (aka Knuth) Shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) { // While there remain elements to shuffle...
    randomIndex = Math.floor(Math.random() * currentIndex);  // Pick a remaining element...
    currentIndex -= 1;
    temporaryValue = array[currentIndex];  // And swap it with the current element.
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
shuffle(givenPairsEasy);

// var currentBoardEasy = new Object();
// currentBoardEasy["e11"] = '-';
// currentBoardEasy["e12"] = '-';
// currentBoardEasy["e13"] = '-';
// currentBoardEasy["e14"] = '-';
// currentBoardEasy["e21"] = '-';
// currentBoardEasy["e22"] = '-';
// currentBoardEasy["e23"] = '-';
// currentBoardEasy["e24"] = '-';
// currentBoardEasy["e31"] = '-';
// currentBoardEasy["e32"] = '-';
// currentBoardEasy["e33"] = '-';
// currentBoardEasy["e34"] = '-';
// currentBoardEasy["e41"] = '-';
// currentBoardEasy["e42"] = '-';
// currentBoardEasy["e43"] = '-';
// currentBoardEasy["e44"] = '-';
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

for (let id in currentBoardEasy) {
  currentBoardEasy[id] = givenPairsEasy.pop();
}

console.log("!!!",{currentBoardEasy});

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

//DOM References:
var easyTimerText;
var easyGameMessage;
var easyStartGameBttn;
var easyPlayNewGameBttn;
var gridBoxEasy;

// Event Listeners
document.addEventListener("DOMContentLoaded", function(e) {
  console.log('LOADED!')
  easyTimerText = document.getElementById("easytimer");
  easyGameMessage = document.getElementById("easygamemessage");
  easyStartGameBttn = document.getElementById("easystartgame");
  easyPlayNewGameBttn = document.getElementById("easyplaynewgame");
  gridBoxEasy = document.getElementById("gridboxeasy");


  //initGame();

  // Click handlers
  easyStartGameBttn.addEventListener("click", function(e) {
    console.log("clicked start game");
    //easyTimerHandle = setInterval(updateClock, 1000);
  });
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    console.log("clicked play new game");
    //reset();
  });
  gridBoxEasy.addEventListener("click", function(e) {
    if (!easyPicsGuessed[e.target.id] && !gameOver) {
      console.log(e.target.id + "clicked!");
      console.log(e.target.id);
      e.target.src = currentBoardEasy[e.target.id].image;
      console.log(e.target.src);
        
      
    }
  }
);
});