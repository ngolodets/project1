
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
var easyPicSelection = [
  {
    letter: "a",
    image: "img/im1.jpg"
  },
  {
    letter: "b",
    image: "img/im2.jpg"
  },
  {
    letter: "c",
    image: "img/im3.jpg"
  },
  {
    letter: "d",
    image: "img/im4.jpg"
  },
  {
    letter: "e",
    image: "img/im5.jpg"
  },
  {
    letter: "f",
    image: "img/im6.jpg"
  },
  {
    letter: "g",
    image: "img/im7.jpg"
  },
  {
    letter: "h",
    image: "img/im8.jpg"
  }
];
console.log(easyPicSelection);

//create an array holding pairs of images for the game:
var givenPairsEasy = easyPicSelection.concat(easyPicSelection);
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
/*
for (var i = 0; i < givenPairsEasy.length; i++) {
  currentBoardEasy.forEach.call(givenPairsEasy, function(item) {
    document.getElementById("gridboxeasy").appendChild(item);
  });
}
*/

/*
function getImage (id) {
  var cell = parseInt(id);
  var filename = "img/im" + givenPairsEasy[cell-1] + ".jpg";
  return filename;
  console.log(filename);
}
console.log(getImage(3));
*/


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

// Eventt Listeners
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
      //for (var i = 0; i < currentBoardEasy.length; i++) {
        //e.target.src = "img/" + givenPairsEasy[i] + "jpg";
        //e.target.src = "" + currentBoardEasy.image + "";
        e.target.src = "img/" + e.target.id + ".jpg";
        console.log(currentBoardEasy.image);
        console.log(currentBoardEasy.id);
        console.log(e.target.src);
      
    }
  });
});



// getImage() has one input, the location of the cell that the user 
// selected (an integer from 1 to 16), and returns the filename (an
// absolute URL) for the image associated with this cell - it assumes 
// that the images are stored in the following directory:
// http://cs.wellesley.edu/~cs110/assignments/assignment6F12/images/
// and have filenames "im1.jpg" ... "im8.jpg"

// 

      
      //e.target.
      
      
      //update the image:
      //e.target.src = "img/cut-" + e.target.id + "-wire.png";
      //mark it as cut
      //wiresCut[e.target.id] = true;
      //was it a correct wire? test to see if it's -1
      //var wireIndex = wiresToCut.indexOf(e.target.id)
      //if (wireIndex > -1) {
        //correct
        //console.log(e.target.id + " was correct");
        //take out the wire out of wires to cut object
        //wiresToCut.splice(wireIndex, 1);
        //check for win will go here:
        //if (checkForWin()) {
          //endGame(true);
        //}
      //} else {
        //incorrect
        //console.log(e.target.id + " was incorrect");
        //start the 750ms delay
        //delayHandle = setTimeout(function() {
          //end the game with a LOSS function
          //console.log("Bang!");
          //endGame(false);
        //}, 750);
      //}
    //} 

    /*
    gridBox.addEventListener('click', function(e){
      if (!boxClicked[e.target.id] && !gameOver) {
        console.log(e.target.id + " Clicked");
        e.target.textContent = x;
        //e.target.src = "img/doggy.jpg";
        if (currentPlayer === 1) {
          e.target.textContent = x;
          //e.target.classList.add(x);
          currentBoard[e.target.id] = x;
          currentBoard[e.target.src] = "img/doggy.jpg";
          console.log(e.target.classList);
          currentPlayer++;
        } else {
          e.target.textContent = o;
          //e.target.classList.add(o);
          currentBoard[e.target.id] = o;
          currentBoard[e.target.src] = "img/kitty.jpg";
          currentPlayer--;
        }
      checkWin();
      }
    })
    */

/*
var picsInPlayEasy = [];
let picIdEasy;
var winEasy = 0;

function checkForMatch() {
	var item = document.getElementById("gridboxeasy");
	item.setAttribute('src', givenPairsEasy[picId].image);

	if (picsInPlay[0] === picsInPlay[1]) {
		console.log("You found a match!");
		//document.getElementById("easywincounter").innerHTML = win + 1;
	} else {
		console.log("Sorry, try again.");
    //document.getElementById('span1').innerHTML = win;
	} 
};
function flipPic() {
	picId = this.getAttribute('data-id');
	picsInPlay.push(givenPairsEasy[picId].letter);
	this.setAttribute('src', givenPairsEasy[picId].image);

	if (picsInPlay.length === 2) {
		checkForMatch();
	}

	console.log("flipped"  + givenPairsEasy[picId].letter);
};

function createBoard() {
	for (var i = 0; i < givenPairsEasy.length; i++) {
		var picElement = document.createElement('img');
		picElement.setAttribute('src', 'img/back.jpg');
		picElement.setAttribute('data-id', i);
		picElement.addEventListener('click', flipPic);
		document.getElementById('gridboxeasy').appendChild(picElement);
	}
};

createBoard();
*/


/*
function createBoard() {
  var gridBoxEasy = document.getElementById("gridboxeasy");
  var gridEasy = document.createElement("section");
  gridEasy.setAttribute("class", "grid");
  gridBoxEasy.appendChild(gridEasy);

  givenPairsEasy.forEach(item => {
  var card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;
  card.style.backgroundImage = "url(img/back.jpg)";
  gridEasy.appendChild(card);
})
*/
  
  /*
  for (var i = 0; i < givenPairsEasy.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'img/back.jpg');
    cardElement.setAttribute('data-id', i);
		//cardElement.addEventListener('click', flipCard);
		document.getElementById("gridboxeasy").appendChild(cardElement);
	}
};
*/





