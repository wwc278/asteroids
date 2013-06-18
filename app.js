$(function () {
  var canvas = $("<canvas width='" + 800 +
                 "' height='" + 800 + "'></canvas>");
  $('body').append(canvas);

  // `canvas.get(0)` unwraps the jQuery'd DOM element;
  // new Circles.Game(800, 800, 10).start(canvas.get(0));
	new Asteroids.Game(800, 800, 6).start(canvas.get(0));
});
