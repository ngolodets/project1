
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
  
  /*
  hardTimerText = document.getElementById("hardtimer");
  hardGameMessage = document.getElementById("hardgamemessage");
  hardStartGameBttn = document.getElementById("hardstartgame");
  hardPlayNewGameBttn = document.getElementById("hardplaynewgame");
  gridBoxHard = document.getElementById("gridboxhard");
  */

  // Click handlers
  easyStartGameBttn.addEventListener("click", function(e) {
    console.log("clicked start game");
    timerHandle = setInterval(updateClockEasy, 1000);
    startGameEasy();
  });
  
  /*
  hardStartGameBttn.addEventListener("click", function(e) {
    console.log("clicked start game");
    timerHandleHard = setInterval(updateClockHard, 1000);
    startGameHard();
  });
  */
  
  easyPlayNewGameBttn.addEventListener("click", function(e) {
    //console.log("clicked play new game");
    resetEasy();
  });
  
  /*
  hardPlayNewGameBttn.addEventListener("click", function(e) {
    //console.log("clicked play new game");
    resetHard();
  });
  */

  gridBoxEasy.addEventListener("click", function(e) {
    //console.log("im clicking");
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
    
      if (checkWinEasy()) {
          endGameEasy(true);
      } 
    }
  });
});

  /*
  gridBoxHard.addEventListener("click", function(e) {
  console.log("im clicking");
    if (!hardPicsGuessed[e.target.id] && !gameOver) {
      console.log(e.target.id + "clicked!");
      e.target.src = currentBoardHard[e.target.id].image;
      console.log(e.target.src);
      openedPicsHard.push(e.target.id);
    
    if (openedPicsHard.length === 2 && currentBoardHard[openedPicsHard[0]].letter === currentBoardHard[openedPicsHard[1]].letter) { //openedPicsHard[0] === openedPicsHard[1]) {
      //matched
      console.log("found a match!");
      //push the guessed pictures into a separate array to compare for the win/loss condition
      guessedPicsHard.push(openedPicsHard);
      //reset the number of pics opened:
      openedPicsHard = [];

      //ensure that we have guessed all the pics on the board:
      unpairedGuessesHard = guessedPicsHard.concat(guessedPicsHard);
      guessesLengthHard = unpairedGuessesHard.length;
      console.log("guessed pics length in match is: " + guessesLength);   

    } else if (openedPicsHard.length === 2 && currentBoardHard[openedPicsHard[0]].letter !== currentBoardHard[openedPicsHard[1]].letter) {
        //unmatched
        console.log("no match!");
        
      //Delay for turning the unmatched pics over:
      delayHandleHard = setTimeout(function() {
        // e.target.src = currentBoardHard[e.target.id].imageback;
      document.getElementById(openedPicsHard[0]).src = currentBoardHard[openedPicsHard[0]].imageback;
      document.getElementById(openedPicsHard[1]).src = currentBoardHard[openedPicsHard[1]].imageback;
          
      //reset the value of pics opened:
      openedPicsHard.length = 0;
      }, 700);
    }
  
    if (checkWinHard()) {
        endGameHard(true);
    } 
    }
  });
});
*/

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

/*
function checkWinHard() {
  if (guessesLengthHard === 50) {
    return true;
  } else if (hardRemainingTime === 0) {
    return false;
  }
}
*/

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

/*
function endGameHard(win) {
  //if game ends, clear the timers
  clearInterval(timerHandleHard);
  clearTimeout(delayHandleHard);
  //change game state to over:
  gameOver = true;
  
  if (win) {
    //win condition
    console.log("endGame says: You won!");
    hardWin++;
    document.getElementById("hardwincounter").textContent = hardWin;
    document.getElementById("hardgamemessage").textContent = "Congratulations! You won!";

  } else {
    //loss condition
    console.log("endGame says: You lost, try again...");
    hardLoss++;
    document.getElementById("hardlosscounter").textContent = hardLoss;
    document.getElementById("hardgamemessage").textContent = "Sorry... Please try again.";
  }
}
*/


function updateClockEasy() {
  easyRemainingTime--;
  if (easyRemainingTime <= 0) {
    endGameEasy(false);
  }
  document.getElementById("easytimer").textContent = easyRemainingTime;
}

/*
function updateClockHard() {
  hardRemainingTime--;
  if (hardRemainingTime <= 0) {
    endGameHard(false);
  }
  document.getElementById("hardtimer").textContent = hardRemainingTime;
  console.log("update clock ran");
}
*/


function startGameEasy() {
  gameOver = false;
  easyRemainingTime = EASY_STARTING_TIME;
  easyTimerText.textContent = easyRemainingTime;
  document.getElementById('easygamemessage').textContent = '';
  openedPicsEasy.length = 0;
  guessedPicsEasy.length = 0;
  guessesLength = 0;
  console.log("startGameEasy says: " + guessedPicsEasy);

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
  //console.log("startGame says current board is: " + currentBoardEasy);
  
  for (let elem2 in easyPicsGuessed) {
    easyPicsGuessed[elem2] = false;
  }
  
  var picImages = gridBoxEasy.children; //picks up every element in the grid box
  for (let i = 0; i < picImages.length; i++) { // show back of each pic
    picImages[i].src = "img/paw.png";
  } 
}

/*
function startGameHard() {
  gameOver = false;
  hardRemainingTime = HARD_STARTING_TIME;
  hardTimerText.textContent = hardRemainingTime;
  document.getElementById('hardgamemessage').textContent = '';
  openedPicsHard.length = 0;
  guessedPicsHard.length = 0;
  guessesLengthHard = 0;
  console.log("start game ran");
  //console.log("startGamehard says: " + guessedPicsHard);

  givenPairsHard = [
    {
      letter: "a",
      image: "img/hard/h11.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "b",
      image: "img/hard/h12.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "c",
      image: "img/hard/h13.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "d",
      image: "img/hard/h14.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "e",
      image: "img/hard/h15.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "f",
      image: "img/hard/h16.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "g",
      image: "img/hard/h17.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "h",
      image: "img/hard/h18.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "i",
      image: "img/hard/h19.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "j",
      image: "img/hard/h110.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "k",
      image: "img/hard/h21.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "l",
      image: "img/hard/h22.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "m",
      image: "img/hard/h23.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "n",
      image: "img/hard/h24.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "o",
      image: "img/hard/h25.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "p",
      image: "img/hard/h26.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "q",
      image: "img/hard/h27.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "r",
      image: "img/hard/h28.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "s",
      image: "img/hard/h29.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "t",
      image: "img/hard/h210.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "u",
      image: "img/hard/h31.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "v",
      image: "img/hard/h32.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "w",
      image: "img/hard/h33.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "x",
      image: "img/hard/h34.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "y",
      image: "img/hard/h35.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "a",
      image: "img/hard/h36.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "b",
      image: "img/hard/h37.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "c",
      image: "img/hard/h38.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "d",
      image: "img/hard/h39.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "e",
      image: "img/hard/h310.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "f",
      image: "img/hard/h41.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "g",
      image: "img/hard/h42.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "h",
      image: "img/hard/h43.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "i",
      image: "img/hard/h44.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "j",
      image: "img/hard/h45.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "k",
      image: "img/hard/h46.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "l",
      image: "img/hard/h47.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "m",
      image: "img/hard/h48.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "n",
      image: "img/hard/h49.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "o",
      image: "img/hard/h410.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "p",
      image: "img/hard/h51.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "q",
      image: "img/hard/h52.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "r",
      image: "img/hard/h53.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "s",
      image: "img/hard/h54.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "t",
      image: "img/hard/h55.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "u",
      image: "img/hard/h56.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "v",
      image: "img/hard/h57.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "w",
      image: "img/hard/h58.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "x",
      image: "img/hard/h59.jpg",
      imageback: "img/hard/back.png"
    },
    {
      letter: "y",
      image: "img/hard/h510.jpg",
      imageback: "img/hard/back.png"
    }
  ];
  
  
  shuffle(givenPairsHard);
  
  for (let elem1 in currentBoardHard) {
    currentBoardHard[elem1] = null;
  }
  
  for (let key in currentBoardHard) {
    currentBoardHard[key] = givenPairsHard.pop();
  }
  //console.log("startGame says current board is: " + currentBoardHard);
  
  for (let elem2 in hardPicsGuessed) {
    hardPicsGuessed[elem2] = false;
  }
  
  var picImagesHard = gridBoxHard.children; //picks up every element in the grid box
  for (let i = 0; i < picImagesHard.length; i++) { // show back of each pic
    picImagesHard[i].src = "img/hard/back.png";
  } 
}
*/

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

/*
function resetHard() {
  gameOver = false;
  hardWin = 0;
  hardLoss = 0;

  document.getElementById("hardwincounter").textContent = hardWin;
  document.getElementById("hardlosscounter").textContent = hardLoss;
  clearTimeout(delayHandleHard);
  clearInterval(timerHandleHard);
  
  startGameHard(); 
}
*/
      