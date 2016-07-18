
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

var player1 = new Player(xborder,
	"rgba(255,0,0,0.8)");
var player2 = new Player(xborder + squareSize*Math.floor(canvas.width/squareSize-1),
	"rgba(0,0,255,0.8)");
player1.init();
player2.init();

//////////////////////////////////////////////////////////////////////////////

setInterval(drawWorld, 20);

generateSquare(200);

//////////////////////////////////////////////////////////////////////////////

function generateSquare(count) {
	for (var i = 0; i < count; i++) {
		squares.push(new Square());
	};
}

function generateGradientsAura() {
	p1gradient = context.createRadialGradient(
		player1.aura.x+squareSize/2,player1.aura.y+squareSize/2,5,
		player1.aura.x+squareSize/2,player1.aura.y+squareSize/2,
		player1.aura.size);
	p1gradient.addColorStop(0,"rgba(255,255,255,0.5)");
	p1gradient.addColorStop(0.5,"rgba(255,150,150,0.5)");
	p1gradient.addColorStop(1,"rgba(100,100,100,0.01)");

	p2gradient = context.createRadialGradient(
		player2.aura.x+squareSize/2,player2.aura.y+squareSize/2,5,
		player2.aura.x+squareSize/2,player2.aura.y+squareSize/2,
		player2.aura.size);
	p2gradient.addColorStop(0,"rgba(255,255,255,0.5)");
	p2gradient.addColorStop(0.5,"rgba(150,150,255,0.5)");
	p2gradient.addColorStop(1,"rgba(100,100,100,0.01)");
}

canvas.addEventListener("click", function() {
    if (!isPlaying) {
    	isPlaying = true;
    }
});

window.addEventListener("keypress", function(e) {
	if (isPlaying) {
		if (e.keyCode == 119) {
			player1.moveUP();
		}
		if (e.keyCode == 97) {
			player1.moveLEFT();
		}
		if (e.keyCode == 115) {
			player1.moveDOWN();
		}
		if (e.keyCode == 100) {
			player1.moveRIGHT();
		}
	};
});

document.onkeydown = function(e) {
    if (isPlaying) {
    	e = e || window.event;
	    if (e.keyCode == '38') {
	        player2.moveUP();
	    }
	    else if (e.keyCode == '40') {
	        player2.moveDOWN();
	    }
	    else if (e.keyCode == '37') {
	       	player2.moveLEFT();
	    }
	    else if (e.keyCode == '39') {
	      	player2.moveRIGHT();
	    }
    }
};

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
		for (var i = 0; i < squares.length; i++) {
			squares[i].update().draw();
		}
	};
}

//////////////////////////////////////////////////////////////////////////////

function drawSquareLogo() {
	var x = canvas.width/2;
	var y = canvas.height/2 - squareSize/2;

	// var g = context.createLinearGradient(x-110,0,x+110,0);
	// g.addColorStop(0,"#f00");
	// g.addColorStop(0.5,"#000");
	// g.addColorStop(1,"#00f");

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
	// context.strokeStyle = g;
	context.lineWidth = 5;
	context.lineCap = "round";
	context.stroke();

	context.lineWidth = 1;
}

function clearCanvas() {
	context.fillStyle = "#001634";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function drawGrid() {

	// context.strokeStyle = "rgba(0,0,0,1)";
	context.strokeStyle = "rgba(255,255,255,0.5)";

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
			var decide = randomBetween(0,4);

			if (this.y-5-squareSize < 0) {
				decide = this.tri(1,2,3);
				if (this.x-5-squareSize < xborder 
					|| this.x-5+squareSize*2 >= canvas.width-xborder-squareSize) {
					decide = 1;
				}
			}
			else if (this.y-5+squareSize*2 >= canvas.height-yborder) {
				decide = this.tri(0,2,3);
				if (this.x-5-squareSize < xborder 
					|| this.x-5+squareSize*2 >= canvas.width-xborder-squareSize) {
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
			if (randomBetween(1,100)==1) {
			this.isMoving = true;}
		}

		if (this.isMoving) {
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
		// context.fillStyle = "rgba(0,0,0,0.5)";
		context.fillStyle = "rgba(255,255,255,0.8)";
		context.fillRect(this.x+5,this.y+5,this.dimention,this.dimention);
		context.fill();
	}
}

function Player(x,col) {
	this.x = x;
	this.y = squareSize*Math.floor((canvas.height/squareSize)/2)+yborder;
	this.initX = this.x;
	this.initY = this.y;
	this.dimention = squareSize-10;
	this.speed = 25;
	this.color = col;
	this.UP = false;
	this.DOWN = false;
	this.LEFT = false;
	this.RIGHT = false;
	this.enemy;
	this.score = ((canvas.width-(xborder*2))/squareSize)/2;

	this.init = function() {
		if (player1 == this) {this.enemy = player2;}
		else {this.enemy = player1;}
	}

	this.moveUP = function() {
		if ((this.y-yborder)%squareSize == 0 && (this.x-xborder)%squareSize == 0
				&& this.y-yborder > 0) {
			this.UP = true;this.DOWN = false;this.LEFT = false;this.RIGHT = false;
			if ((this.enemy).y == this.y-squareSize
				&& (this.enemy).x == this.x) {this.UP=false;}
		}
	}
	this.moveDOWN = function() {
		if ((this.y-yborder)%squareSize == 0 && (this.x-xborder)%squareSize == 0
				&& this.y+yborder+squareSize < canvas.height) {
			this.UP = false;this.DOWN = true;this.LEFT = false;this.RIGHT = false;
			if ((this.enemy).y == this.y+squareSize
				&& (this.enemy).x == this.x) {this.DOWN=false;}
		}
	}
	this.moveLEFT = function() {
		if ((this.y-yborder)%squareSize == 0 && (this.x-xborder)%squareSize == 0
				&& this.x-xborder > 0) {
			this.UP = false;this.DOWN = false;this.LEFT = true;this.RIGHT = false;
			if ((this.enemy).x == this.x-squareSize
				&& (this.enemy).y == this.y) {this.LEFT=false;}
		}
	}
	this.moveRIGHT = function() {
		if ((this.y-yborder)%squareSize == 0 && (this.x-xborder)%squareSize == 0
				&& this.x+xborder+squareSize < canvas.width) {
			this.UP = false;this.DOWN = false;this.LEFT = false;this.RIGHT = true;
			if ((this.enemy).x == this.x+squareSize
				&& (this.enemy).y == this.y) {this.RIGHT=false;}
		}
	}
	this.move = function() {
		if (this.UP) {
			this.y-=this.speed;
			if ((this.y-yborder)%squareSize == 0) {
				this.UP = false;
			}
		}
		else if (this.DOWN) {
			this.y+=this.speed;
			if ((this.y-yborder)%squareSize == 0) {
				this.DOWN = false;
			}
		}
		else if (this.LEFT) {
			this.x-=this.speed;
			if ((this.x-xborder)%squareSize == 0) {
				this.LEFT = false;
			}
		}
		else if (this.RIGHT) {
			this.x+=this.speed;
			if ((this.x-xborder)%squareSize == 0) {
				this.RIGHT = false;
			}
		}
	}

	this.reset = function() {
		this.x = this.initX;
		this.y = this.initY;
	}

	this.checkIfHit = function() {
		for (var i = 0; i < squares.length; i++) {
			if (this.x == squares[i].x && this.y == squares[i].y) {
				this.reset();
			}
		}
	}

	this.drawScore = function() {

	}

	this.update = function() {
		if (this.UP || this.DOWN || this.LEFT || this.RIGHT) {
			this.move();
		}
		this.checkIfHit();
		return this;
	}

	this.draw = function() {
		this.drawScore();
		context.beginPath();
		context.fillStyle = this.color;
		context.fillRect(this.x+5,this.y+5,this.dimention,this.dimention);
		context.fill();
	}
}

//////////////////////////////////////////////////////////////////////////////
