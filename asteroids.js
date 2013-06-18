var Asteroids = (function() {
	function MovingObject(x, y, r){
		this.positionX = x;
		this.positionY = y;
		this.radius = r;
		this.speed = 2;
		this.dx = (Math.random() < 0.5) ?
		-this.speed * Math.random() : this.speed * Math.random();
		this.dy = (Math.random() < 0.5) ?
		-this.speed * Math.random() : this.speed * Math.random();
		this.update = function(){
			this.positionX += this.dx;
			this.positionY += this.dy;
		}

		this.offscreen = function(){
			if ((this.positionX < 0 || this.positionX > 800) ||
				  (this.positionY < 0 || this.positionY > 800)) {
				return true;
			}
			return false;
		}
	}

	function Asteroid(x, y, r){
		MovingObject.call(this, x, y, r);
	}

	function E(){
		this.constructor = new Asteroid();
	}

	E.prototype = MovingObject.prototype;
	Asteroid.prototype = new E();

	Asteroid.randomAsteroid = function(maxX, maxY, r){
		return new Asteroid(
			maxX * Math.random(),
			maxY * Math.random(),
			r);
	};


	Asteroid.prototype.draw = function(ctx){
		console.log(ctx);

		ctx.fillStyle = "red";
		ctx.beginPath();

		ctx.arc(
			this.positionX % 800,
			this.positionY % 800,
			this.radius,
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
			this.asteroids.push(Asteroid.randomAsteroid(this.xDim, this.yDim, 20));
		}
	}

	Game.prototype.render = function(ctx){
		ctx.clearRect(0, 0, this.xDim, this.yDim);

		this.ship.draw(ctx);

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

		// this.ship.update();

		for (var i = 0; i < this.asteroids.length; i++){
 	  	this.asteroids[i].update();
		}

		if (this.ship.isHit(this.asteroids)) {
			console.log("Game Over!");
			alert("Game Over!");
		}
	}

	function Ship(x, y){
		MovingObject.call(this, x, y);
		this.velocity = { x: 0, y: 0 };
	}
	//


	// inheritance
	function F(){
		this.constructor = new Ship();
	}

	F.prototype = MovingObject.prototype;
	Ship.prototype = new F();

	Ship.prototype.draw = function(ctx){
		console.log(ctx);

		ctx.fillStyle = "blue";
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
	}

	Ship.prototype.isHit = function(asteroids){
		for(var i=0; i < asteroids.length; i++){
			var xDifference = (asteroids[i].positionX - this.positionX);
	    var yDifference = (asteroids[i].positionY - this.positionY);
			var distance = Math.sqrt(xDifference*xDifference +
														   yDifference*yDifference);

			if (distance < (this.radius + asteroids[i].radius)){
				return true;
			}
		}
		return false;
	}

	return {
		Asteroid: Asteroid,
		Ship: Ship,
		Game: Game
	};
})();