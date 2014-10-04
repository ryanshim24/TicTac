// Tell's the user whose turn it is.
var turn= "X"; 
var winner = 0;

function startGame(){ 
  setMessage(turn + " starts first");
  winner = 0;
}

// Creates the visible message for the user's to see. 
function setMessage(msg) { 
  document.getElementById("message").innerText = msg; //Replace previous text with the new message.
}

function thisClick(){ // This function lets us click the Boxes
  var boxClick = document.querySelectorAll("td"); // querySelector puts all the td's information into an array
  for (var i = boxClick.length - 1; i >= 0; i--) { //A for loop that lets us go through the new created array
    boxClick[i].addEventListener("click", nextMove);//In the event that one of these boxes are clicked it goes to the function nextMove
  }
}

//This function sets the inner text of the box to either "X" or "O" 
function nextMove() {
  // console.log("Clicked item:" + this.innerHTML + ". Event:" + event);
  if (winner !== 0) {
    setMessage("This game is over");
  }else if (this.innerText === ""){ //Checks to see if the inner text is empty if so it continues the game
    this.innerText = turn;
    switchTurn();
  } else { // Notifies the user that square has an text already in that box
    setMessage("Can't be replaced Sucka");
  }
}

//Checks to see whether the inner text of the box is either "X " or "O" and switches between so
function switchTurn() {
  if (checkForWinner(turn)) { //Checks to see if either player "X" or player "O" won.
    setMessage("Good Job, " + turn + "! Somehow you won!");
    winner = 1; //This ends the game because document.winner is no longer null
  }else if (turn == "X") { //this is where the switch occurs if there's no winner
    turn = "O";
     setMessage("It's " + turn + " 's turn");
  } else {
    turn = "X";
     setMessage("It's " + turn + " 's turn");
  }
}
//The win conditions... 3 for rows, 3 for columns, 3 for diagnols
function checkForWinner(move) {
  var result = false;
  if (checkRow(1, 2, 3, move) || 
      checkRow(4, 5, 6, move) || 
      checkRow(7, 8, 9, move) ||  
      checkRow(1, 4, 7, move) ||
      checkRow(2, 5, 8, move) ||
      checkRow(3, 6, 9, move) ||
      checkRow(1, 5, 9, move) ||
      checkRow(3, 5, 7, move)) {

      result = true;
  }
  return result;
}

//Checks for the win conditions of 3 in a row
function checkRow(a, b, c, move) { 
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}
//Gets the inner text of the Box s1, s2, etc and see if the value is either "X" or "O"
function getBox(number) {
  return document.getElementById("s" + number).innerText;
}

function clearBox() { //My Reset button
  var boxes = document.querySelectorAll("td.box_cell");//Puts the information of the boxes into an array.
  for (i =0; i<boxes.length; i++) {
    boxes[i].innerText = ""; // Loop goes through each box and and makes the text back to empty
  }
  intialize(); //restarts the program back to the Start.
}


function intialize() {
  startGame();
  thisClick();

}

window.onload = intialize;

