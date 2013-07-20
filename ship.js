(function(my){

  MovingObject = my.MovingObject;

  function Ship(x, y, r){
    MovingObject.call(this, x, y, r);
    this.direction = Math.PI/2;
    this.speed = 0;
    this.update = function(){
      this.dx = Math.cos(this.direction) * this.speed;
      this.dy = Math.sin(this.direction) * this.speed;
      this.positionX += this.dx;
      this.positionY += this.dy;
    }
    this.bullets = [];
    this.powering = false;
  }

  function F(){
    this.constructor = new Ship();
  }

  F.prototype = MovingObject.prototype;
  Ship.prototype = new F();

  Ship.prototype.turnLeft = function(){
    this.direction -= 0.1
  }

  Ship.prototype.turnRight = function(){
    this.direction += 0.1
  }

  Ship.prototype.draw = function(ctx){

    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.fillStyle = "black";

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

    var triangleSideLength, angle, secondPointX, secondPointY;
    var thirdPointX, thirdPointX;

    triangleSideLength = Math.sqrt(20 * 20 + 10 * 10);
    angle = Math.atan(2);

    secondPointX = this.positionX + triangleSideLength *
    Math.cos(angle + Math.PI/2 - this.direction);
    secondPointY = this.positionY - triangleSideLength *
    Math.sin(angle + Math.PI/2 - this.direction);

    thirdPointX = this.positionX +
    Math.cos(Math.PI/2 - this.direction) * 20;
    thirdPointY = this.positionY -
    Math.sin(Math.PI/2 - this.direction) * 20;

    ctx.beginPath();
    ctx.moveTo(this.positionX, this.positionY);
    ctx.lineTo(secondPointX, secondPointY);
    ctx.lineTo(thirdPointX, thirdPointY);
    ctx.lineTo(this.positionX, this.positionY);
    ctx.stroke();


    ctx.fill();
  }

  Ship.prototype.isHit = function(asteroids){

    for(var i=0; i < asteroids.length; i++){

      var xDifference = (asteroids[i].positionX - this.positionX);
      var yDifference = (asteroids[i].positionY - this.positionY);
      var distance = Math.sqrt(xDifference * xDifference +
        yDifference * yDifference);

      if (distance < (this.radius + asteroids[i].radius)){
        return true;
      }
    }
    return false;
  }

  Ship.prototype.power = function(){
    console.log(this.powering)
    var that = this;
    if (!this.powering){
      this.powering = window.setInterval(function(){
        that.speed += -0.1;

        if (that.speed > 3) {
          that.speed = 3;
        } else if (that.speed < -3){
          that.speed = -3;
        }
      }, 1000/60);
    }
    
  }

  Ship.prototype.powerDown = function(){
    console.log("in power down", this.powering)
    window.clearInterval(this.powering)
    this.powering = false;
  }

  Ship.prototype.fireBullet = function(){
    var posX = this.positionX;
    var posY = this.positionY;
    var that = this;
    that.bullets.push(new my.Bullet(posX, posY, 2, that.direction + 3.3));	


  }

  Ship.prototype.bulletHit = function(asteroids){

    for(var i=0; i < asteroids.length; i++){
      for(var j=0; j < this.bullets.length; j++){
        var currBullet = this.bullets[j];

        var xDifference = (asteroids[i].positionX - currBullet.positionX);
        var yDifference = (asteroids[i].positionY - currBullet.positionY);
        var distance = Math.sqrt(xDifference * xDifference +
          yDifference * yDifference);

        if (distance < (currBullet.radius + asteroids[i].radius)){ 
          asteroids[i] = my.Asteroid.randomAsteroid(1, 1, 20);
        }
      }
    }
  }

  my.Ship = Ship;

})(Asteroids);