var canvas = document.getElementById("Square");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var squares = [];
var players = [];
var goals = [];
var scores = [];

clearCanvas();
generateCharacter();
generateSquare(175);
generateScore();
setInterval(drawWorld, 20);
console.log(canvas.width);


window.addEventListener("keypress", function(e) {
	if (e.keyCode == 119 && players[0].y > 50) {
		players[0].y -= 50;
	}
	if (e.keyCode == 97 && players[0].x > 0) {
		players[0].x -= 50;
	}
	if (e.keyCode == 115 && players[0].y < canvas.height - 150) {
		players[0].y += 50;
	}
	if (e.keyCode == 100 && players[0].x < canvas.width - 100) {
		players[0].x += 50;
	}

	if (e.keyCode == 105 && players[1].y > 50) {
		players[1].y -= 50;
	}
	if (e.keyCode == 106 && players[1].x > 0) {
		players[1].x -= 50;
	}
	if (e.keyCode == 107 && players[1].y < canvas.height - 150) {
		players[1].y += 50;
	}
	if (e.keyCode == 108 && players[1].x < canvas.width - 100) {
		players[1].x += 50;
	}
});


function drawWorld() {
	clearCanvas();
	drawGrid();
	for (var i = 0; i < squares.length; i++) {
		squares[i].update(players[0].x, players[0].y, 0);
		squares[i].update(players[1].x, players[1].y, 1);
	};
	for (var i = 0; i < squares.length; i++) {
		squares[i].draw();
	};
	players[0].update().draw(1);
	players[1].update().draw(2);
	scores[0].update().draw();
	scores[1].update().draw();

	context.fillStyle = "rgba(200, 200, 200, 0.70)";
	context.fillRect(50*scores[0].length, scores[0].y1, 50, 15);
	context.fillRect(50*scores[0].length, scores[0].y2, 50, 15);
}

function generateCharacter() {
	players.push(new Character(0, 50*7));
	players.push(new Character(1300, 50*7));
	// goals.push(new Goal());
}

function generateSquare(count) {
	for (var i = 0; i < count; i++) {
		squares.push(new Square());
	};
}

function generateScore() {
	scores.push(new Score(0, 1));
	scores.push(new Score(1350, -1));
}

function clearCanvas() {
	context.fillStyle = "#000000";
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
	context.fillStyle = "rgba(255, 255, 255, 0.10)";
	context.fillRect(0, canvas.height-55, canvas.width, 25);
	context.fillRect(0, 12, canvas.width, 25);
}

function getRandomX() {
	return 50*randomBetween(2, 25);
}

function getRandomY() {
	return 50*randomBetween(1, 14);
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
	this.rad = 50;
	this.hit = false;

	this.update = function(a, b, i) {
		this.hit = false;

		if (a == this.x && b == this.y){
			this.hit = true;
			if (i == 0) {
				scores[0].length--;
				scores[1].length++;
			};
			if (i == 1) {
				scores[1].length--;
				scores[0].length++;
			};
		};

		if (!this.move) {
			this.direction = randomBetween(1, 5);
			if (this.x  < 100) {this.direction = 2; };
			if (this.x  > canvas.width-150) {this.direction = 4; };
			if (this.y  < 50) {this.direction = 3; };
			if (this.y  > canvas.height-100) {this.direction = 1; };
			this.life++;
			// this.life = 50;
			// this.rad--;
			// this.x+=0.5;
			// this.y+=0.5;
			if (this.life == 200) {
				this.life = 50;
				this.move = true;
			};
		};

		if (this.move) {
			if (this.direction == 1) {this.y--; };
			if (this.direction == 2) {this.x++; };
			if (this.direction == 3) {this.y++; };
			if (this.direction == 4) {this.x--; };
			this.life--;
			// this.rad++;
			// this.x-=0.5;
			// this.y-=0.5;
			if (this.life <= 0) {
				this.move = false;
			};
		};

		if (this.hit) {
			if (i == 0) {
				players[0].x = 0;
				players[0].y = getRandomY();
			};
			if (i == 1) {
				players[1].x = 1300;
				players[1].y = getRandomY();
			};
		};
		
		return this;
	}

	this.draw = function() {
		context.fillStyle = "rgba(255, 255, 255, 0.20)";
		context.fillRect(this.x, this.y, this.rad, this.rad);

		return this;
	}	
}

function Character(x, y) {
	this.x = x;
	this.y = y;
	this.goal = false;

	this.update = function() {
		if (players[0].x > 1250) {
			players[0].goal = true;
			players[0].x = 0;
			players[0].y = getRandomY();
			scores[1].length-=2;
			scores[0].length+=2;
		};
		if (players[1].x < 50) {
			players[1].goal = true;
			players[1].x = 1300;
			players[1].y = getRandomY();
			scores[0].length-=2;
			scores[1].length+=2;
		};

		return this;
	}

	this.draw = function(col) {
		if (col == 1) {
			context.fillStyle = "rgba(155, 0, 0, 0.50)";
			context.fillRect(this.x, this.y, 50, 50);
		};
		if (col == 2) {
			context.fillStyle = "rgba(0, 0, 155, 0.50)";
			context.fillRect(this.x, this.y, 50, 50);
		};
		

		return this;
	}	
}

function Score(x, type) {
	this.x = x;
	this.y1 = canvas.height-50;
	this.y2 = 17;
	this.length = 13;

	this.update = function() {
		
		if (this.length >= 28) {
			scores[0].length = 13;
			scores[1].length = 13;
		};

		if (this.length < 0) {
			this.length = 0;
		};

		return this;
	}

	this.draw = function() {
		if (type == 1) {
			context.fillStyle = "rgba(155, 0, 0, 0.50)";
			context.fillRect(this.x, this.y1, 50*this.length*type, 15);
			context.fillRect(this.x, this.y2, 50*this.length*type, 15);
		};
		if (type == -1) {
			context.fillStyle = "rgba(0, 0, 155, 0.50)";
			context.fillRect(this.x, this.y1, 50*this.length*type, 15);
			context.fillRect(this.x, this.y2, 50*this.length*type, 15);
		};

		return this;
	}
}