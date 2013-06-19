$(function () {
  var canvas = $("<canvas id='cvs' width='" + 800 +
                 "' height='" + 800 + "'></canvas>");

  $('body').append(canvas);
	new Asteroids.Game(800, 800, 6).start(canvas.get(0));
});
