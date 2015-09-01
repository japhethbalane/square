var canvas = document.getElementById("Square");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var squares = [];


clearCanvas();
generateSquare(0);
setInterval(drawWorld, 10);


function drawWorld() {
	clearCanvas();
	drawGrid();
	for (var i = 0; i < squares.length; i++) {
		squares[i].update().draw();
	};
}

function generateSquare(count) {
	for (var i = 0; i < count; i++) {
		squares.push(new Square());
	};
}

function clearCanvas() {
	context.fillStyle = "#001634";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
	clearCanvas();
	context.beginPath();
	context.moveTo(50, 50);
	context.lineTo(canvas.width-50, 50);
	context.lineTo(canvas.width-50, canvas.height-50);
	context.lineTo(50, canvas.height-50);
	context.lineTo(50, 50);
	context.strokeStyle = "rgba(255, 255, 255, 0.15)";
	context.stroke();
}

function getRandomX(dim) {
	return randomBetween(0, canvas.width);
}

function getRandomY(dim) {
	return randomBetween(0, canvas.height);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function Square() {
	this.x = getRandomX();
	this.y = getRandomY();

	this.update = function() {
		
		return this;
	}

	this.draw = function() {
		context.fillStyle = "rgba(255, 255, 255, 0.20)";
		context.fillRect(this.x, this.y, 50, 50);

		return this;
	}	
}