var canvas = document.getElementById("Square");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var squares = [];
var players = [];
var isPlaying = false;

setInterval(drawWorld, 20);

var mousePress = function(event) {
    
};canvas.addEventListener("click", mousePress);

window.addEventListener("keypress", function(e) {
	if (isPlaying) {
		if (e.keyCode == 119) {
			
		}
		if (e.keyCode == 97) {
			
		}
		if (e.keyCode == 115) {
			
		}
		if (e.keyCode == 100) {
			
		}
	};
});

document.onkeydown = checkKey;
function checkKey(e) {
    if (isPlaying) {
    	e = e || window.event;
	    if (e.keyCode == '38') {
	        // up arrow
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	    }
	    else if (e.keyCode == '37') {
	       // left arrow
	    }
	    else if (e.keyCode == '39') {
	       // right arrow
	    }
    }
}

function drawWorld() {
	clearCanvas();
	drawGrid();
	if (!isPlaying) {
		drawSquareLogo();
	};
	if (isPlaying) {
		
	};
}

function drawSquareLogo() {
	context.beginPath();
	context.moveTo(50*8-10, 50*7+10);
	context.lineTo(50*7+10, 50*7+10);
	context.lineTo(50*7+10, 50*7+25);
	context.lineTo(50*8-10, 50*7+25);
	context.lineTo(50*8-10, 50*7+40);
	context.lineTo(50*7+10, 50*7+40);
	context.moveTo(50*8, 50*7);
	context.lineTo(50*9, 50*7);
	context.lineTo(50*9, 50*8);
	context.lineTo(50*8, 50*8);
	context.lineTo(50*8, 50*7);
	context.moveTo(50*8+35, 50*7+40);
	context.lineTo(50*8+35, 50*8+10);
	context.moveTo(50*9+10, 50*7+10);
	context.lineTo(50*9+10, 50*7+40);
	context.lineTo(50*9+40, 50*7+40);
	context.lineTo(50*9+40, 50*7+10);
	context.moveTo(50*10+10, 50*7+10);
	context.lineTo(50*10+40, 50*7+10);
	context.lineTo(50*10+40, 50*7+40);
	context.lineTo(50*10+10, 50*7+40);
	context.lineTo(50*10+10, 50*7+25);
	context.lineTo(50*10+40, 50*7+25);
	context.moveTo(50*11+10, 50*7+40);
	context.lineTo(50*11+10, 50*7+10);
	context.lineTo(50*11+40, 50*7+10);
	context.moveTo(50*12+40, 50*7+40);
	context.lineTo(50*12+10, 50*7+40);
	context.lineTo(50*12+10, 50*7+10);
	context.lineTo(50*12+40, 50*7+10);
	context.lineTo(50*12+40, 50*7+25);
	context.lineTo(50*12+10, 50*7+25);
	context.strokeStyle = "#fff";
	context.stroke();
}

function generateSquare(count) {
	// for (var i = 0; i < count; i++) {
	// 	squares.push(new Square());
	// };
}

function clearCanvas() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
	
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}