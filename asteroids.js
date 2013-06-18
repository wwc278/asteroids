var Asteroids = (function() {
	function MovingObject(x, y){
		this.positionX = x;
		this.positionY = y;

		this.offscreen = function(){
			if ((this.positionX < 0 || this.positionX > 800) ||
				  (this.positionY < 0 || this.positionY > 800)) {
				return true;
			}
			return false;
		}
	}

	function Asteroid(x, y){
		this.positionX = x; // Do we have to do this twice?
		this.positionY = y;
		this.dx = (Math.random() < 0.5) ? -2 * Math.random() : 2 * Math.random();
		this.dy = (Math.random() < 0.5) ? -2 * Math.random() : 2 * Math.random();
		this.update = function(){
			this.positionX += this.dx;
			this.positionY += this.dy;
		}
	}


	Asteroid.prototype = new MovingObject();

	Asteroid.randomAsteroid = function(maxX, maxY){
		return new Asteroid(
			maxX * Math.random(),
			maxY * Math.random());
	};


	Asteroid.prototype.draw = function(ctx){
		console.log(ctx);

		ctx.fillStyle = "red";
		ctx.beginPath();

		ctx.arc(
			this.positionX,
			this.positionY,
			10,
			0,
			2 * Math.PI,
			false
		);

		ctx.fill();
	};

	function Game(xDim, yDim, numAsteroids){
		this.xDim = xDim;
		this.yDim = yDim;
		this.ship = new Ship(xDim/2, yDim/2);
		this.asteroids = []

		for (var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroid.randomAsteroid(this.xDim, this.yDim));
		}
	}

	Game.prototype.render = function(ctx){
		ctx.clearRect(0, 0, this.xDim, this.yDim);

		for (var i = 0; i < this.asteroids.length; i++){
			console.log(this.asteroids[i]);
			this.asteroids[i].draw(ctx);
		}
	}

	Game.prototype.start = function(canvasEl){
		var ctx = canvasEl.getContext("2d");

		var that = this;
		window.setInterval(function(){
			that.update();
			that.render(ctx);
		}, 1);
	};

	Game.prototype.update = function(){
		for (var i = 0; i < this.asteroids.length; i++){
 	  	this.asteroids[i].update();

			if (this.asteroids[i].offscreen()) {
				this.asteroids[i] = Asteroid.randomAsteroid(this.xDim, this.yDim);
			}
		}
	}

	function Ship(x, y){
		this.positionX = x;
		this.positionY = y;
	}

	Ship.prototype.draw = function(ctx){

	}

	function F(){
		this.constructor = new Ship();
	}

	F.prototype = MovingObject.prototype;
	Ship.prototype = new F();

	return {
		Asteroid: Asteroid,
		Ship: Ship,
		Game: Game
	};
})();