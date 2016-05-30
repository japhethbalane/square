
//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("Square");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var squares = [];
var players = [];
var isPlaying = false;
var squareSize = 50;
var xborder = (canvas.width-(squareSize*(Math.floor(canvas.width/squareSize))))/2;
var yborder = (canvas.height-(squareSize*(Math.floor(canvas.height/squareSize))))/2;

var player1 = new Player(xborder);
var player2 = new Player(xborder + squareSize*Math.floor(canvas.width/squareSize-1));

//////////////////////////////////////////////////////////////////////////////

setInterval(drawWorld, 20);

generateSquare(100);

//////////////////////////////////////////////////////////////////////////////

function generateSquare(count) {
	for (var i = 0; i < count; i++) {
		squares.push(new Square());
	};
}

var mousePress = function(event) {
    if (!isPlaying) {
    	isPlaying = true;
    }
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
		console.log(e.keyCode);
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

//////////////////////////////////////////////////////////////////////////////

function drawWorld() {
	clearCanvas();
	drawGrid();
	if (!isPlaying) {
		drawSquareLogo();
	};
	if (isPlaying) {
		player1.update().draw();
		player2.update().draw();
		console.log(player1.y);
		for (var i = 0; i < squares.length; i++) {
			squares[i].update().draw();
		}
	};
}

//////////////////////////////////////////////////////////////////////////////

function drawSquareLogo() {
	var x = canvas.width/2;
	var y = canvas.height/2 - squareSize/2;

	context.beginPath();

	context.moveTo(x-100-10, y+10);
	context.lineTo(x-150+10, y+10);
	context.lineTo(x-150+10, y+25);
	context.lineTo(x-100-10, y+25);
	context.lineTo(x-100-10, y+40);
	context.lineTo(x-150+10, y+40);

	context.moveTo(x-100, y);
	context.lineTo(x-50, y);
	context.lineTo(x-50, y+50);
	context.lineTo(x-100, y+50);
	context.lineTo(x-100, y);
	context.moveTo(x-100+35, y+40);
	context.lineTo(x-100+35, y+60);

	context.moveTo(x-50+10, y+10);
	context.lineTo(x-50+10, y+40);
	context.lineTo(x-50+40, y+40);
	context.lineTo(x-50+40, y+10);

	context.moveTo(x+10, y+10);
	context.lineTo(x+40, y+10);
	context.lineTo(x+40, y+40);
	context.lineTo(x+10, y+40);
	context.lineTo(x+10, y+25);
	context.lineTo(x+40, y+25);

	context.moveTo(x+50+10, y+40);
	context.lineTo(x+50+10, y+10);
	context.lineTo(x+50+40, y+10);

	context.moveTo(x+100+40, y+40);
	context.lineTo(x+100+10, y+40);
	context.lineTo(x+100+10, y+10);
	context.lineTo(x+100+40, y+10);
	context.lineTo(x+100+40, y+25);
	context.lineTo(x+100+10, y+25);

	context.strokeStyle = "#fff";
	context.lineWidth = 5;
	context.lineCap = "round";
	context.stroke();

	context.lineWidth = 1;
}

function clearCanvas() {
	gradient = context.createRadialGradient(
		canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,800);
	gradient.addColorStop(0,'#000');
	gradient.addColorStop(1,'#666');
	context.fillStyle = gradient;
	context.fillRect(0,0,canvas.width,canvas.height);
}

function drawGrid() {

	context.strokeStyle = "rgba(0,0,0,0.2)";

	context.moveTo(xborder,yborder);
	context.lineTo(canvas.width-xborder,yborder);
	context.lineTo(canvas.width-xborder,canvas.height-yborder);
	context.lineTo(xborder,canvas.height-yborder);
	context.lineTo(xborder,yborder);
	context.stroke();

	for (var i = xborder+squareSize; i < canvas.width-xborder; i+=squareSize) {
		context.beginPath();
		context.moveTo(i,yborder);
		context.lineTo(i,canvas.height-yborder);
		context.stroke();
	}

	for (var i = yborder+squareSize; i < canvas.height-yborder; i+=squareSize) {
		context.beginPath();
		context.moveTo(xborder,i);
		context.lineTo(canvas.width-xborder,i);
		context.stroke();
	}
}

//////////////////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//////////////////////////////////////////////////////////////////////////////

function Square() {
	this.x = squareSize*randomBetween(0+1,(Math.floor(canvas.width/squareSize)-1))+xborder;
	this.y = squareSize*randomBetween(0,Math.floor(canvas.height/squareSize))+yborder;
	this.dimention = squareSize-10;
	this.stopTimer = 1;

	this.isMoving = false;

	this.UP;this.DOWN;this.LEFT;this.RIGHT;
	this.UP = this.DOWN = this.LEFT = this.RIGHT = false;

	this.tri = function (a,b,c) {
		var tri = randomBetween(0,3);
		if (tri == 0) {
			return a;
		}
		else if (tri == 1) {
			return b;
		}
		else {
			return c;
		}
	}

	this.update = function() {

		if ((this.x - xborder)%squareSize == 0 &&
			(this.y - yborder)%squareSize == 0) {
			this.isMoving = false;
			this.UP = this.DOWN = this.LEFT = this.RIGHT = false;
		}

		if (!this.isMoving) {
			this.stopTimer--;
		}
		if (!this.isMoving && this.stopTimer <= 0) {
			var decide = randomBetween(0,4);

			if (this.y-5-squareSize < 0) {
				decide = this.tri(1,2,3);
				if (this.x-5-squareSize < xborder || this.x-5+squareSize*2 >= canvas.width-xborder-squareSize) {
					decide = 1;
				}
			}
			else if (this.y-5+squareSize*2 >= canvas.height-yborder) {
				decide = this.tri(0,2,3);
				if (this.x-5-squareSize < xborder || this.x-5+squareSize*2 >= canvas.width-xborder-squareSize) {
					decide = 0;
				}
			}
			else if (this.x-5-squareSize < xborder) {
				decide = this.tri(0,1,3);
			}
			else if (this.x-5+squareSize*2 >= canvas.width-xborder-squareSize) {
				decide = this.tri(0,1,2);
			}

			if (decide == 0) {
				this.UP = true;
			}
			else if (decide == 1) {
				this.DOWN = true;
			}
			else if (decide == 2) {
				this.LEFT = true;
			}
			else if (decide == 3) {
				this.RIGHT = true;
			}
			this.isMoving = true;
		}

		if (this.isMoving) {
			this.stopTimer = 10;
			if (this.UP) {
				this.y--;
			}
			else if (this.DOWN) {
				this.y++;
			}
			else if (this.LEFT) {
				this.x--;
			}
			else if (this.RIGHT) {
				this.x++;
			}
		}

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.fillStyle = "rgba(255,255,255,0.3)";
		context.fillRect(this.x+5,this.y+5,this.dimention,this.dimention);
		context.fill();
	}
}

function Player(x) {
	this.x = x;
	this.y = squareSize*Math.floor((canvas.height/squareSize)/2)+yborder;
	this.dimention = squareSize-10;

	this.update = function() {

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.fillStyle = "rgba(0,0,0,0.5)";
		context.fillRect(this.x+5,this.y+5,this.dimention,this.dimention);
		context.fill();
	}

}

//////////////////////////////////////////////////////////////////////////////
