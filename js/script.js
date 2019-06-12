
const EASY_STARTING_TIME = 60;
var easyWin = 0;
var easyLoss = 0;
var gameOver = false;
var easyRemainingTime = 0;
var timeLeft = 0;
var delayHandle = null;
var timerHandle = null;
//var easyTimerHandle = null;
//var easyDelayHandle = null;

//var picsFlipped = 0;
//picsInPlayEasy = [];

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
//var notGuessedPicsEasy = [];
//var openedPicsEasyObj = {};
//var guessedPicsEasy = [];
//var picIdEasy;
//var count = 0;
//var picsOpened = 0;

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


  initGame();

  // Click handlers
  easyStartGameBttn.addEventListener("click", function(e) {
    console.log("clicked start game");
    timerHandle = setInterval(updateClock, 1000);
    initGame();
  });
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    console.log("clicked play new game");
    reset();
  });
  gridBoxEasy.addEventListener("click", function(e) {
    if (!easyPicsGuessed[e.target.id] && !gameOver) {
      console.log(e.target.id + "clicked!");
      e.target.src = currentBoardEasy[e.target.id].image;
      console.log(e.target.src);
      openedPicsEasy.push(e.target.id);
      
      if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter === currentBoardEasy[openedPicsEasy[1]].letter) { //openedPicsEasy[0] === openedPicsEasy[1]) {
        //matched
        console.log("found a match!");
  
        guessedPicsEasy.push(openedPicsEasy);
        openedPicsEasy = [];
        
          //openedPicsEasy.push(currentBoardEasy[e.target.id].letter);
          //if (guessedPicsEasy.length === currentBoardEasy.length) {
          //}
          //gridBoxEasy.classList.add("match");
          //openedPicsEasy = [];
        console.log("opened pics are: " + openedPicsEasy);
        console.log("guessed pics are: " + guessedPicsEasy);
        //checkWin();

      } else if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter !== currentBoardEasy[openedPicsEasy[1]].letter) {
          //unmatched
          console.log("no match!")
          console.log("My array", currentBoardEasy);
          console.log("Opened array", openedPicsEasy);
        // openedPicsEasy.pop(currentBoardEasy[e.target.id].letter);
        // openedPicsEasy.pop(currentBoardEasy[e.target.id].letter);
          delayHandle = setTimeout(function() {
          // e.target.src = currentBoardEasy[e.target.id].imageback;
          document.getElementById(openedPicsEasy[0]).src = currentBoardEasy[openedPicsEasy[0]].imageback;
          document.getElementById(openedPicsEasy[1]).src = currentBoardEasy[openedPicsEasy[1]].imageback;
            
          openedPicsEasy.length = 0;
          }, 700);
          
          console.log("now opened pics are:" + openedPicsEasy);
          console.log("guessed pics are: " + guessedPicsEasy);
          //checkWin();
          
          // openedPicsEasy = [];
          //e.target.src = currentBoardEasy[e.target.id].imageback;
      }
      //checkWin();
      //if (guessedPicsEasy.length === 16 && easyRemainingTime !== 0) {
       
      if (checkWin()) {
          endGame(true);
        } 
      //}
       //checkWin();

       
        
    }
  });
});

/*
function checkWin() {
  gameOver = false;
  //return guessedPicsEasy.length;
  //return easyRemainingTime;
  if (guessedPicsEasy.length === 16) {
    gameOver = true;
    clearInterval(timerHandle);
    clearTimeout(delayHandle);
    console.log("checkWin() says: You won!");
    easyWin++;
    document.getElementById("easywincounter").textContent = easyWin;
    document.getElementById("easygamemessage").textContent = "Congratulations! You won!";
    
    //break;
  } else if (guessedPicsEasy.length !== 16) {
    gameOver = true;
    clearInterval(timerHandle);
    clearTimeout(delayHandle);
    console.log(" checkWin() says: You lost, try again...");
    easyLoss++;
    document.getElementById("easylosscounter").textContent = easyLoss;
    document.getElementById("easygamemessage").textContent = "Sorry... Please try again."
  }
  
}
*/


function checkWin() {
  gameOver = false;
  if (guessedPicsEasy.length === 16) {
    clearInterval(timerHandle);
    clearTimeout(delayHandle);
    console.log("checkWin() says: You won!");
    //easyWin++;
    //document.getElementById("easywincounter").textContent = easyWin;
    //document.getElementById("easygamemessage").textContent = "Congratulations! You won!";

  } 
  else if (easyRemainingTime === 0) {
    clearInterval(timerHandle);
    clearTimeout(delayHandle);
    console.log(" checkWin() says: You lost, try again...");
    //easyLoss++;
    //document.getElementById("easylosscounter").textContent = easyLoss;
    //document.getElementById("easygamemessage").textContent = "Sorry... Please try again."
  }

}

  /*gameOver = false;
  if (guessedPicsEasy.length === 16 && easyRemainingTime !== 0) {
    //gameOver = true;
    //document.getElementById("easygamemessage").textContent = "Congratulations! You won!";
    console.log("checkWin says: You won!");
    //easyWin++;
    document.getElementById("easywincounter").textContent = easyWin;
 
  } else if (guessedPicsEasy.length < 16 && easyRemainingTime === 0) {
    //gameOver = true;
    console.log("checkWin() says: you lost");
    //document.getElementById("easygamemessage").textContent = "Sorry... Please try again."
    //easyLoss++;
    document.getElementById("easylosscounter").textContent = easyLoss;
  }
  */
//}



function endGame(win) {
  //if game ends, clear the timers
  clearTimeout(delayHandle);
  clearInterval(timerHandle);
  //change game state to over:
  gameOver = true;
  //enable reset button
  //resetButton.disabled = false;
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
    document.getElementById("easygamemessage").textContent = "Sorry... Please try again."
    //easyLoss++;
    //document.getElementById("easylosscounter").textContent = easyLoss;
    //document.getElementById("easygamemessage").textContent = "Sorry... Please try again."

 
    //change background pic
    //document.body.classList.remove("unexploaded");
    //document.body.classList.add("exploaded");
  }
}


function updateClock() {
  easyRemainingTime--;
  if (easyRemainingTime <= 0) {
    endGame(false);
    //timeLeft = easyRemainingTime;
  }
  document.getElementById("easytimer").textContent = easyRemainingTime;
}

function initGame() {
  //wiresToCut.length = 0; //empty out the array from a previous game
  easyRemainingTime = EASY_STARTING_TIME;
  easyTimerText.textContent = easyRemainingTime;
  document.getElementById('easygamemessage').textContent = '';
  guessedPicsEasy.length = 0;
  //document.getElementById("gridboxeasy").disabled = true;  

  /*
  for (let box in easyPicsGuessed) {
    easyPicsGuessed[box] = false;
  }
  for (let cell in currentBoardEasy) {
    currentBoardEasy[cell] = null;
  }
  */
}

function reset() {
  gameOver = false;

  easyWin = 0;
  easyLoss = 0;

  document.getElementById("easywincounter").textContent = easyWin;
  document.getElementById("easylosscounter").textContent = easyLoss;
  clearTimeout(delayHandle);
  clearInterval(timerHandle);
  
  initGame();
}
      