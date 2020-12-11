const fps = 60;

var score = 0;
var ship = new Ship();

var mouseX = 0.0;
var mouseY = 0.0;
var lastMouseX = 0.0;
var lastMouseY = 0.0;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var backgroundImg = new Image();
backgroundImg.src = "background.svg";

var gameOver = false;
var asteroids = new Array(10);
for (let i = 0; i < 10; i++) {
	asteroids[i] = new Asteroid(Math.random() * canvas.width, Math.random() * canvas.height);
}

function draw() {
	if (gameOver) {
		return;
	}
	
	ship.move();
	for (let i = 0; i < 10; i++) {
		if (!asteroids[i] || asteroids[i].x < ship.x - canvas.width / 2 - Asteroid.asteroidSvg.width) {
			asteroids[i] = new Asteroid(ship.x + canvas.width + Math.random() * canvas.width, Math.random() * canvas.height);
		}
		if (Math.abs(asteroids[i].x - ship.x) < Ship.shipSvg.width / 2 + Asteroid.asteroidSvg.width / 2 / 1.2 && Math.abs(asteroids[i].y - ship.y) < Ship.shipSvg.height / 2 + Asteroid.asteroidSvg.height / 2 / 1.2) {
			ship.damage++;
			asteroids[i] = new Asteroid(ship.x + canvas.width / 2 + Asteroid.asteroidSvg.width + Math.random() * canvas.width, Math.random() * canvas.height);
		}
	}

	if (ship.damage > 4) {
		gameOver = true;
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.translate(-ship.x / 50, 0);
	ctx.drawImage(backgroundImg, Math.floor((ship.x / 50) / canvas.width) * canvas.width, 0);
	ctx.drawImage(backgroundImg, Math.floor((ship.x / 50) / canvas.width + 1) * canvas.width - 1, 0);
	ctx.translate(ship.x / 50, 0);

	ctx.translate(canvas.width / 2, 0);
	
	ctx.translate(-ship.x, 0);
	for (let i = 0; i < 10; i++) {
		if (asteroids[i]) asteroids[i].draw(canvas, ctx);
	}
	ctx.translate(ship.x, 0);

	ship.draw(canvas, ctx);
	
	ctx.translate(-canvas.width / 2, 0);

	if (ship.x > score) {
		score = ship.x;
	}
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.fillText("Score: " + Math.floor(score / 10), 10, 15);
	ctx.fillText("Damage: " + ship.damage + "/5", 10, 30); 

	lastMouseX = mouseX;
	lastMouseY = mouseY;
	
	if (gameOver) {
		ctx.fillStyle = "#ffffff7f";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "red";
		ctx.font = "50px Arial";
		ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2 - 25);
	}
};
setInterval(draw, 1000 / fps);
onmousemove = function(e) {
	e = window.event || e;  // IE uses e, everything else is window.event

	mouseX = e.clientX;
	mouseY = e.clientY;
};
