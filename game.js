// GAME.JS
// Type it, a touch typing game created by AKJM (Alex Malone).

// Global variables
var game = false;
var init = false;
var lost = false;
var score = 0;

var abc = "qwertyuiopasdfghjklzxcvbnm";
var xyz = abc.split("");

var cur_letter = ""
var history = ""

// Timer
var count=40; 
var gametime = 100;
var counter;

// Keypress detection
$(document).keypress(function(event) {

	// Check for first-run
	if (game == false && init == false) {
		if (lost == false) {
			startgame();
		}
	}
	
	// Check if game in progress
	else if (game == true && cur_letter !== "") {
		
		// Decode which key is pressed
		var c = String.fromCharCode(event.which)
		
		// End game if wrong
		if (c !== cur_letter.toLowerCase()) {
			endGame()
		}
		
		// Log key, reload the round
		else {
		
			// Increase and dispay the new score
			score++;
			$("#score").html("CURRENT SCORE: " + score);
			
			// String(cur_letter + " ");
			
			// Add the pressed key to the history background div
			document.getElementById("history_p").innerHTML = document.getElementById("history_p").innerHTML + String(cur_letter + " ");
			
			// Reload the timer and round
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
	init = true;
	
	// Countdown screen timers
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
		
		// Play the game
		playgame();
	}, 3000);
}

// End the game
function endGame() {

	// Clear the timer
	clearInterval(counter);
	
	game = false;
	$("#game").hide();
	lost = true;

	// End screen
	$("#gameover").show();
	$("#scorefinal").html("FINAL SCORE: " + score);
}

// Generate a random letter
function genLetter() {

	// Random value from array
	cur_letter = xyz[Math.floor(Math.random()*xyz.length)];
	
	// Randomly upper or lower case
	if(Math.round(Math.random()) == 1) {
		cur_letter = cur_letter.toUpperCase();
	}
	
	// Set letter
	$("#letter").html(cur_letter);
}

// Playgame
function playgame() {

	// Init
	$("#history").show();
	$("#score").show();
	//$("#pressure").show();

	game = true;
	loadRound();
}

// Load round
function loadRound() {

	// Timer countdown
	count=40;
	
	// Reset timer
	clearInterval(counter);
	
	// Generate Letter
	genLetter();
	
	// Timer
	counter=setInterval(function() {timer();}, gametime); //1000 will  run it every 1 second
	timer();
}

// Timer function, sourced from stackoverflow
function timer() {

  count=count-1;
  if (count <= 0) {
  
     //Couter end
	 clearInterval(counter);
     endGame();
  }

  // Display seconds
  $("#timer").html(count);
}
