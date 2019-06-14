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

// Event Listeners
document.addEventListener("DOMContentLoaded", function(e) {
  console.log('LOADED!')
  easyTimerText = document.getElementById("easytimer");
  easyGameMessage = document.getElementById("easygamemessage");
  easyStartGameBttn = document.getElementById("easystartgame");
  easyPlayNewGameBttn = document.getElementById("easyplaynewgame");
  gridBoxEasy = document.getElementById("gridboxeasy");
  
  // Click handlers
  easyStartGameBttn.addEventListener("click", function(e) {
    //console.log("clicked start game");
    timerHandle = setInterval(updateClockEasy, 1000);
    startGameEasy();
  });
  
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    //console.log("clicked play new game");
    resetEasy();
  });
  
  gridBoxEasy.addEventListener("click", function(e) {
    //console.log("im clicking");
    if (!easyPicsGuessed[e.target.id] && !gameOver) {
      console.log(e.target.id + "clicked!");
      e.target.src = currentBoardEasy[e.target.id].image;
      console.log(e.target.src);
      openedPicsEasy.push(e.target.id);
      
      if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter === currentBoardEasy[openedPicsEasy[1]].letter) { //openedPicsEasy[0] === openedPicsEasy[1]) {
        //matched logic:
        //push the guessed pictures into a separate array to compare for the win/loss condition
        guessedPicsEasy.push(openedPicsEasy);
        //reset the number of pics opened:
        openedPicsEasy = [];
        
        //ensure that we have guessed all the pics on the board:
        unpairedGuesses = guessedPicsEasy.concat(guessedPicsEasy);
        guessesLength = unpairedGuesses.length;
        //console.log("guessed pics length in match is: " + guessesLength);   
        
      } else if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter !== currentBoardEasy[openedPicsEasy[1]].letter) {
        //unmatched logic:
        //Delay for turning the unmatched pics over:
        delayHandle = setTimeout(function() {
          // e.target.src = currentBoardEasy[e.target.id].imageback;
          document.getElementById(openedPicsEasy[0]).src = currentBoardEasy[openedPicsEasy[0]].imageback;
          document.getElementById(openedPicsEasy[1]).src = currentBoardEasy[openedPicsEasy[1]].imageback;
          //reset the value of pics opened:
          openedPicsEasy.length = 0;
        }, 700);
      }
      
      if (checkWinEasy()) {
        endGameEasy(true);
      } 
    }
  });
});

function checkWinEasy() {
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

function endGameEasy(win) {
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
    document.getElementById("easygamemessage").style.backgroundColor = "rgba(150, 196, 60, 0.5)";
  } else {
    //loss condition
    console.log("endGame says: You lost, try again...");
    easyLoss++;
    document.getElementById("easylosscounter").textContent = easyLoss;
    document.getElementById("easygamemessage").textContent = "Sorry... Please try again.";
    document.getElementById("easygamemessage").style.backgroundColor = "rgba(247, 85, 74, 0.5)";
  }
}

function updateClockEasy() {
  easyRemainingTime--;
  if (easyRemainingTime <= 0) {
    endGameEasy(false);
  }
  document.getElementById("easytimer").textContent = easyRemainingTime;
}

function startGameEasy() {
  gameOver = false;
  easyRemainingTime = EASY_STARTING_TIME;
  easyTimerText.textContent = easyRemainingTime;
  document.getElementById('easygamemessage').textContent = '';
  openedPicsEasy.length = 0;
  guessedPicsEasy.length = 0;
  guessesLength = 0;

  givenPairsEasy = [
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
  
  shuffle(givenPairsEasy);
  
  for (let elem1 in currentBoardEasy) {
    currentBoardEasy[elem1] = null;
  }
  
  for (let key in currentBoardEasy) {
    currentBoardEasy[key] = givenPairsEasy.pop();
  }
  
  for (let elem2 in easyPicsGuessed) {
    easyPicsGuessed[elem2] = false;
  }
  
  var picImages = gridBoxEasy.children; //picks up every element in the grid box
  for (let i = 0; i < picImages.length; i++) { // show back of each pic
    picImages[i].src = "img/paw.png";
  } 
}

function resetEasy() {
  //console.log("what is gameOver", gameOver)
  gameOver = false;
  easyWin = 0;
  easyLoss = 0;
  
  document.getElementById("easywincounter").textContent = easyWin;
  document.getElementById("easylosscounter").textContent = easyLoss;
  clearTimeout(delayHandle);
  clearInterval(timerHandle);
  
  startGameEasy();  
}

      