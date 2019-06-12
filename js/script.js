
const EASY_STARTING_TIME = 10;
var easyWin = 0;
var easyLoss = 0;
var gameOver = false;
var easyRemainingTime = 0;
var timeLeft = 0;
var delayHandle = null;
var timerHandle = null;

//images for the game:
var givenPairsEasy = [
  {
    letter: "a",
    image: "img/e11.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "b",
    image: "img/e12.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "c",
    image: "img/e13.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "d",
    image: "img/e14.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "e",
    image: "img/e21.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "f",
    image: "img/e22.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "g",
    image: "img/e23.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "h",
    image: "img/e24.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "a",
    image: "img/e31.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "b",
    image: "img/e32.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "c",
    image: "img/e33.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "d",
    image: "img/e34.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "e",
    image: "img/e41.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "f",
    image: "img/e42.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "g",
    image: "img/e43.jpg",
    imageback: "img/back.jpg"
  },
  {
    letter: "h",
    image: "img/e44.jpg",
    imageback: "img/back.jpg"
  }
];

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
var guessedPicsEasy = [];
var guessesLength = 0;
var unpairedGuesses = [];

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
    timerHandle = setInterval(updateClock, 1000);

    startGame();
  });
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    console.log("clicked play new game");
    resetScores();
  });
  gridBoxEasy.addEventListener("click", function(e) {
    console.log("im clicking");
    if (!easyPicsGuessed[e.target.id] && !gameOver) {
      console.log(e.target.id + "clicked!");
      e.target.src = currentBoardEasy[e.target.id].image;
      console.log(e.target.src);
      openedPicsEasy.push(e.target.id);
      
      if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter === currentBoardEasy[openedPicsEasy[1]].letter) { //openedPicsEasy[0] === openedPicsEasy[1]) {
        //matched
        console.log("found a match!");
        
        //push the guessed pictures into a separate array to compare for the win/loss condition
        guessedPicsEasy.push(openedPicsEasy);
        //reset the number of pics opened:
        openedPicsEasy = [];

        //ensure that we have guessed all the pics on the board:
        unpairedGuesses = guessedPicsEasy.concat(guessedPicsEasy);
        guessesLength = unpairedGuesses.length;
        //console.log("guessed pics length in match is: " + guessesLength);   

      } else if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter !== currentBoardEasy[openedPicsEasy[1]].letter) {
          //unmatched
          console.log("no match!");
          
        //Delay for turning the unmatched pics over:
        delayHandle = setTimeout(function() {
          // e.target.src = currentBoardEasy[e.target.id].imageback;
        document.getElementById(openedPicsEasy[0]).src = currentBoardEasy[openedPicsEasy[0]].imageback;
        document.getElementById(openedPicsEasy[1]).src = currentBoardEasy[openedPicsEasy[1]].imageback;
            
        //reset the value of pics opened:
        openedPicsEasy.length = 0;
        }, 700);
      }
    
      if (checkWin()) {
          endGame(true);
      } 
    }
  });
});

function checkWin() {
  //console.log("guessed pics length checkWin is: " + guessedPicsEasy.length);
  if (guessesLength === 16) {
    console.log("checkWin()'s the guessed length is: " + guessesLength);
    console.log("checkWin() says: You won!");
    return true;
  } else if (easyRemainingTime === 0) {
    console.log("checkWin() says: You lost, try again...");
    return false;
  }
}

function endGame(win) {
  //if game ends, clear the timers
  clearInterval(timerHandle);
  clearTimeout(delayHandle);
  //change game state to over:
  gameOver = true;
  
  if (win) {
    //win condition
    console.log("endGame says: You won!");
    easyWin++;
    document.getElementById("easywincounter").textContent = easyWin;
    document.getElementById("easygamemessage").textContent = "Congratulations! You won!";
    
    //change timer colors
    //timerText.classList.remove("red");
    //timerText.classList.add("green");

  } else {
    //loss condition
    console.log("endGame says: You lost, try again...");
    easyLoss++;
    document.getElementById("easylosscounter").textContent = easyLoss;
    document.getElementById("easygamemessage").textContent = "Sorry... Please try again.";

    //change background pic
    //document.body.classList.remove("unexploaded");
    //document.body.classList.add("exploaded");
  }
}

function updateClock() {
  easyRemainingTime--;
  if (easyRemainingTime <= 0) {
    endGame(false);
  }
  document.getElementById("easytimer").textContent = easyRemainingTime;
}

function startGame() {
  gameOver = false;
  easyRemainingTime = EASY_STARTING_TIME;
  easyTimerText.textContent = easyRemainingTime;
  document.getElementById('easygamemessage').textContent = '';
  openedPicsEasy.length = 0;
  guessedPicsEasy.length = 0;
  
  //shuffle(givenPairsEasy);
  
  /*
  for (let elem1 in currentBoardEasy) {
    currentBoardEasy[elem1] = null;
  }
  
  for (let key in currentBoardEasy) {
    currentBoardEasy[key] = givenPairsEasy.pop();
  }
  //console.log("startGame says current board is: " + currentBoardEasy);
  
  for (let elem2 in easyPicsGuessed) {
    easyPicsGuessed[elem2] = false;
    */
  //}
  
  var picImages = gridBoxEasy.children; //picks up every element in the grid box
  for (let i = 0; i < picImages.length; i++) { // show back of each pic
    picImages[i].src = "img/back.jpg";
  }
}

function resetScores() {
  //console.log("what is gameOver", gameOver)
  gameOver = false;
  startGame();
  easyWin = 0;
  easyLoss = 0;
  //easyRemainingTime = 10;

  document.getElementById("easywincounter").textContent = easyWin;
  document.getElementById("easylosscounter").textContent = easyLoss;
  //clearTimeout(delayHandle);
  //clearInterval(timerHandle);

  //easyRemainingTime = EASY_STARTING_TIME;
  document.getElementById("easytimer").textContent = easyRemainingTime;
  document.getElementById('easygamemessage').textContent = '';
  //openedPicsEasy.length = 0;
  //guessedPicsEasy.length = 0;
  
}
      