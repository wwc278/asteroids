// file for keypress or key hold events

$(document).keydown(function(e){
	console.log(e.which)
	if (e.which === 83){
		Asteroids.game.ship.fireBullet();
	}

})