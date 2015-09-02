var canvas = document.getElementById("Square");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var squares = [];
var players = [];


clearCanvas();
generateCharacter();
generateSquare(100);
setInterval(drawWorld, 10);
console.log(canvas.width);

function drawWorld() {
	clearCanvas();
	drawGrid();
	for (var i = 0; i < squares.length; i++) {
		squares[i].update().draw();
	};
	players[0].draw(1);
	players[1].draw(2);
}

function generateCharacter() {
	players.push(new Character(25, 75));
	players.push(new Character(25, 675));
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
	var gap = 50;
	for(var i = 0; i*gap < canvas.height; i++){
		context.beginPath();
		context.moveTo(0, i*gap);
		context.lineTo(canvas.width, i*gap);
		context.strokeStyle = "rgba(200, 200, 200, 0.15)";
		context.stroke();
	}
	for(var i = 0; i*gap < canvas.width; i++){
		context.beginPath();
		context.moveTo(i*gap, 0);
		context.lineTo(i*gap, canvas.height);
		context.strokeStyle = "rgba(200, 200, 200, 0.15)";
		context.stroke();
	}
}

function getRandomX() {
	return 50*randomBetween(1, 27);
}

function getRandomY() {
	return 50*randomBetween(1, 15);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function Square() {
	this.x = getRandomX();
	this.y = getRandomY();
	this.direction = randomBetween(1, 5);
	this.move = true;
	this.life = 50;
	this.rad = 0;

	this.update = function() {
		if (!this.move) {
			this.direction = randomBetween(1, 5);
			if (this.x  <= 0) {this.direction = 2; };
			if (this.x  >= canvas.width-100) {this.direction = 4; };
			if (this.y  <= 0) {this.direction = 3; };
			if (this.y  >= canvas.height-100) {this.direction = 1; };
			this.life = 50;
			this.rad--;
			this.x+=0.5;
			this.y+=0.5;
			if (this.rad == 0) {
				this.move = true;
			};
		};

		if (this.move) {
			if (this.direction == 1) {this.y--; };
			if (this.direction == 2) {this.x++; };
			if (this.direction == 3) {this.y++; };
			if (this.direction == 4) {this.x--; };
			this.life--;
			this.rad++;
			this.x-=0.5;
			this.y-=0.5;
			if (this.life <= 0) {
				this.move = false;
			};
		};
		
		return this;
	}

	this.draw = function() {
		context.fillStyle = "rgba(255, 255, 255, 0.20)";
		context.fillRect(this.x+25, this.y+25, this.rad, this.rad);

		return this;
	}	
}

function Character(x, y) {
	this.x = x;
	this.y = y;

	this.update = function() {


		return this;
	}

	this.draw = function(col) {
		if (col == 1) {
			context.fillStyle = "rgba(255, 0, 0, 0.50)";
			context.fillRect(this.x-20, this.y-20, 40, 40);
		};
		if (col == 2) {
			context.fillStyle = "rgba(0, 0, 255, 0.50)";
			context.fillRect(this.x-20, this.y-20, 40, 40);
		};
		

		return this;
	}	
}