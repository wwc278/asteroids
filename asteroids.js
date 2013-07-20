var Asteroids = (function(my) {
	function MovingObject(x, y, r){
		this.positionX = x;
		this.positionY = y;
		this.radius = r;

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
		this.speed = 1;
		this.dx = (Math.random() < 0.5) ?
		-this.speed * Math.random() : this.speed * Math.random();
		this.dy = (Math.random() < 0.5) ?
		-this.speed * Math.random() : this.speed * Math.random();
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

		ctx.fillStyle = "red";
		ctx.beginPath();

		if (this.positionX < 0) {
			this.positionX += 800;
		} else {
			this.positionX %= 800;
		};

		if (this.positionY < 0) {
			this.positionY += 800;
		} else {
			this.positionY %= 800;
		};

		ctx.arc(
			this.positionX,
			this.positionY,
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
		this.numAsteroids = numAsteroids;
		console.log('make new ship')
		this.ship = new my.Ship(xDim/2, yDim/2, 8);
		this.asteroids = [];

		for (var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroid.randomAsteroid(this.xDim, this.yDim, 20));
		}

		return this;
	}

	Game.prototype.render = function(ctx){
		ctx.clearRect(0, 0, this.xDim, this.yDim);

		this.ship.draw(ctx);

		for (var i = 0; i < this.ship.bullets.length; i++) {
			this.ship.bullets[i].draw(ctx);
		}


		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
	}

	Game.prototype.start = function(canvasEl){
		my.canvasEl = canvasEl;
		var ctx = canvasEl.getContext("2d");
		var that = this;

		that.updateAndRender = window.setInterval(function(){
			that.update(ctx);
			that.render(ctx);
		}, 1000/60);

	};

	Game.prototype.update = function(ctx){

		var that = this;
		key('up', function(){
			that.ship.power(-0.1);
		})
		key('down', function(){
			that.ship.power(0.1);
		})

		key('left', function(){
			that.ship.turnLeft();
		})

		key('right', function(){
			that.ship.turnRight();
		})

		// key('s', function(){
		// 	that.ship.fireBullet();
		// })

		this.ship.update();

		for (var i = 0; i < this.ship.bullets.length; i++) {
			var currBullet = this.ship.bullets[i]
			currBullet.update();

			if ((currBullet.positionX < 0) || (currBullet.positionX > 800) ||
    		 (currBullet.positionY < 0) || (currBullet.positionY > 800)) {
					 this.ship.bullets.splice(i, i);
				 }
		}

		for (var i = 0; i < this.asteroids.length; i++){
 	  	this.asteroids[i].update();
		}

		this.ship.bulletHit(this.asteroids);

		this.ship.speed /= 1.02;

		var that = this;

		if (this.ship.isHit(this.asteroids)) {
			// alert("Game Over!");
			window.clearInterval(that.updateAndRender);

			Asteroids.game = new my.Game(800, 800, 6);
			Asteroids.game.start(my.canvasEl);
		}
	}

	

	function Bullet(x, y, r, d){
		console.log('making new bullet')
		MovingObject.call(this, x, y, r);
		this.direction = d;
		this.speed = 6;

		this.update = function(){
			this.dx = Math.cos(this.direction) * this.speed;
			this.dy = Math.sin(this.direction) * this.speed;
			this.positionX += this.dx;
			this.positionY += this.dy;
		}
	}

	function G(){
		this.constructor = new Bullet();
	}

	G.prototype = MovingObject.prototype;

	Bullet.prototype = new G();

	Bullet.prototype.draw = function(ctx){
		ctx.fillStyle = "green";
		ctx.beginPath();

		ctx.arc(
			this.positionX,
			this.positionY,
			this.radius,
			0,
			2 * Math.PI,
			false
		);
		ctx.fill();
	}

	my.Asteroid = Asteroid;
	my.Game = Game;
	my.MovingObject = MovingObject;
	my.Bullet = Bullet;

	return my;
})({});