// GAME.JS
// Type it, a touch typing game created by AKJM (Alex Malone).

// Global variables
var game = false;
var lost = false;

var abc = "qwertyuiopasdfghjklzxcvbnm";
var xyz = abc.split("");

var cur_letter = ""
var history = ""

// Timer
var count=4; 
var gametime = 1000;
var counter;


// Keypress detection
$(document).keypress(function(event) {

	// Check for first-run
	if (game == false) {
		if (lost == false) {
			startgame();
		}
	}
	
	// Check if game in progress
	else if (game == true) {
		
		// Decode which key is pressed
		var c = String.fromCharCode(event.which)
		
		// End game if wrong
		if (c !== cur_letter) {
			endGame()
		}
		
		// Log key, reload the round
		else {
			String(cur_letter + " ");
			document.getElementById("history_p").innerHTML = document.getElementById("history_p").innerHTML + String(cur_letter + " ");
			clearInterval(counter);
			loadRound();
		}
	}
});

// Start the game
function startgame() {
	
	// Set up
	$("#menu").hide();
	$("#countdown").show();
	
	$("#c3").show();

	setTimeout(function(){
		$("#c3").hide();
		$("#c2").show();
	}, 1000);
	
	setTimeout(function(){
		$("#c3").hide();
		$("#c2").hide();
		$("#c1").show();
	}, 2000);
	
	setTimeout(function(){
		$("#countdown").hide();
		playgame();
	}, 3000);
}

function endGame() {
	clearInterval(counter);
	game = false;
	$("#game").hide();
	lost = true;
}

function genLetter() {
	cur_letter = xyz[Math.floor(Math.random()*xyz.length)];
	$("#letter").html(cur_letter);
}

function playgame() {
	$("#history").show();
	game = true;
	loadRound();
}

function loadRound() {
	count=4;
	clearInterval(counter);
	genLetter();
	counter=setInterval(function() {timer();}, gametime); //1000 will  run it every 1 second
	timer();
}

function timer() {

  count=count-1;
  if (count <= 1) {
  
     //Couter end
	 clearInterval(counter);
     endGame();
  }

  // Display seconds
  $("#timer").html(count);
}
