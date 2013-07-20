// file for keypress or key hold events

$(document).keypress(function(e){
	console.log(e.which)
	if (e.which === 115){
		Asteroids.game.ship.fireBullet();
	}

})