
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {                               // While there remain elements to shuffle...
    randomIndex = Math.floor(Math.random() * currentIndex);  // Pick a remaining element...
    currentIndex -= 1;
    temporaryValue = array[currentIndex];                    // And swap it with the current element.
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Event Listeners:
document.addEventListener("DOMContentLoaded", function(e) {
  easyTimerText = document.getElementById("easytimer");
  easyGameMessage = document.getElementById("easygamemessage");
  easyStartGameBttn = document.getElementById("easystartgame");
  easyPlayNewGameBttn = document.getElementById("easyplaynewgame");
  gridBoxEasy = document.getElementById("gridboxeasy");
  
  // Click handlers:
  easyStartGameBttn.addEventListener("click", function(e) {
    timerHandle = setInterval(updateClockEasy, 1000);
    startGameEasy();
  });
  
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    resetEasy();
  });
  
  gridBoxEasy.addEventListener("click", function(e) {
    if (!easyPicsGuessed[e.target.id] && !gameOver) {
      e.target.src = currentBoardEasy[e.target.id].image;
      openedPicsEasy.push(e.target.id);
      //matched logic:
      if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter === currentBoardEasy[openedPicsEasy[1]].letter) { 
        guessedPicsEasy.push(openedPicsEasy);                        //push the guessed pictures into a separate array to compare for the win/loss condition
        openedPicsEasy = [];                                         //reset the number of pics opened                                                            
        unpairedGuesses = guessedPicsEasy.concat(guessedPicsEasy);   //ensure that we have guessed all the pics on the board
        guessesLength = unpairedGuesses.length;  
      //unmatched logic:
      } else if (openedPicsEasy.length === 2 && currentBoardEasy[openedPicsEasy[0]].letter !== currentBoardEasy[openedPicsEasy[1]].letter) {
        delayHandle = setTimeout(function() {                        //Delay for turning the unmatched pics over
          document.getElementById(openedPicsEasy[0]).src = currentBoardEasy[openedPicsEasy[0]].imageback;
          document.getElementById(openedPicsEasy[1]).src = currentBoardEasy[openedPicsEasy[1]].imageback;
          openedPicsEasy.length = 0;                                  //reset the value of pics opened
        }, 700);
      }
      if (checkWinEasy()) {
        endGameEasy(true);
      } 
    }
  });
});

function checkWinEasy() {
  if (guessesLength === 16) {
    return true;
  } else if (easyRemainingTime === 0) {
    return false;
  }
}

function endGameEasy(win) {
  clearInterval(timerHandle);     //if game ends, clear the timers
  clearTimeout(delayHandle);
  gameOver = true;                //change game state to over
  if (win) {                      //win condition
    easyWin++;
    document.getElementById("easywincounter").textContent = easyWin;
    document.getElementById("easygamemessage").textContent = "Congratulations! You won!";
    document.getElementById("easygamemessage").style.backgroundColor = "rgba(150, 196, 60, 0.5)";
  } else {                        //loss condition
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
  
  var picImages = gridBoxEasy.children;           //picks up every element in the grid box
  for (let i = 0; i < picImages.length; i++) {    // show back of each pic
    picImages[i].src = "img/paw.png";
  } 
}

function resetEasy() {
  gameOver = false;
  easyWin = 0;
  easyLoss = 0;
  
  document.getElementById("easywincounter").textContent = easyWin;
  document.getElementById("easylosscounter").textContent = easyLoss;
  clearTimeout(delayHandle);
  clearInterval(timerHandle);
  
  startGameEasy();  
}

      