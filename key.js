// file for keypress or key hold events

$(document).keypress(function(e){
	if (e.which === 115){
		Asteroids.game.ship.fireBullet();
	} else if (e.which === 97){
		Asteroids.game.ship.turnLeft();
	} else if (e.which === 100){
		Asteroids.game.ship.turnRight();
	}
})

$(document).keydown(function(e){
	console.log(e.which)
	if (e.which === 87){
		Asteroids.game.ship.power();
	}
})

$(document).keyup(function(e){
	console.log(e.which)
	if (e.which === 87){
		Asteroids.game.ship.powerDown();
	}
})