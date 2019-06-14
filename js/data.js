
const EASY_STARTING_TIME = 60;
var easyWin = 0;
var easyLoss = 0;
var delayHandle = null;
var timerHandle = null;
var easyRemainingTime = 0;
var gameOver = false;
/*
const HARD_STARTING_TIME = 300;
var hardWin = 0;
var hardLoss = 0;
var hardRemainingTime = 0;
var delayHandleHard = null;
var timerHandleHard = null;
*/

var givenPairsEasy;
//var givenPairsHard;

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

/*
var currentBoardHard = {
  h11: null,
  h12: null,
  h13: null,
  h14: null,
  h15: null,
  h16: null,
  h17: null,
  h18: null,
  h19: null,
  h110: null,
  h21: null,
  h22: null,
  h23: null,
  h24: null,
  h25: null,
  h26: null,
  h27: null,
  h28: null,
  h29: null,
  h210: null,
  h31: null,
  h32: null,
  h33: null,
  h34: null,
  h35: null,
  h36: null,
  h37: null,
  h38: null,
  h39: null,
  h310: null,
  h41: null,
  h42: null,
  h43: null,
  h44: null,
  h45: null,
  h46: null,
  h47: null,
  h48: null,
  h49: null,
  h410: null,
  h51: null,
  h52: null,
  h53: null,
  h54: null,
  h55: null,
  h56: null,
  h57: null,
  h58: null,
  h59: null,
  h510: null
}
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
/*
var hardPicsGuessed = {
  h11: false,
  h12: false,
  h13: false,
  h14: false,
  h15: false,
  h16: false,
  h17: false,
  h18: false,
  h19: false,
  h110: false,
  h21: false,
  h22: false,
  h23: false,
  h24: false,
  h25: false,
  h26: false,
  h27: false,
  h28: false,
  h29: false,
  h210: false,
  h31: false,
  h32: false,
  h33: false,
  h34: false,
  h35: false,
  h36: false,
  h37: false,
  h38: false,
  h39: false,
  h310: false,
  h41: false,
  h42: false,
  h43: false,
  h44: false,
  h45: false,
  h46: false,
  h47: false,
  h48: false,
  h49: false,
  h410: false,
  h51: false,
  h52: false,
  h53: false,
  h54: false,
  h55: false,
  h56: false,
  h57: false,
  h58: false,
  h59: false,
  h510: false
}
*/

var openedPicsEasy =[];
var guessedPicsEasy = [];
var guessesLength = 0;
var unpairedGuesses = [];

/*
var openedPicsHard = [];
var guessedPicsHard = [];
var guessesLengthHard = 0;
var unpairedGuessesHard = [];
*/

//DOM References:
var easyTimerText;
var easyGameMessage;
var easyStartGameBttn;
var easyPlayNewGameBttn;
var gridBoxEasy;

/*
var hardTimerText;
var hardGameMessage;
var hardStartGameBttn;
var hardPlayNewGameBttn;
var gridBoxHard;
*/


  