$(function () {
	var canvas = $("<canvas id='cvs' width='" + 800 +
		"' height='" + 800 + "'></canvas>");

	$('body').append(canvas);

	Asteroids.game = new Asteroids.Game(800, 800, 6)
	Asteroids.game.start(canvas.get(0));
});
