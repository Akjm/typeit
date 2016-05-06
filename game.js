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
			score++;
			$("#score").html("CURRENT SCORE: " + score);
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
	init = true;
	
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

	$("#gameover").show();
	$("#scorefinal").html("FINAL SCORE: " + score);
}

function genLetter() {
	cur_letter = xyz[Math.floor(Math.random()*xyz.length)];
	
	if(Math.round(Math.random()) == 1) {
		cur_letter = cur_letter.toUpperCase();
	}
	
	$("#letter").html(cur_letter);
}

function playgame() {
	$("#history").show();
	$("#score").show();
	//$("#pressure").show();

	game = true;
	loadRound();
}

function loadRound() {
	count=40;
	clearInterval(counter);
	genLetter();
	counter=setInterval(function() {timer();}, gametime); //1000 will  run it every 1 second
	timer();
}

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

