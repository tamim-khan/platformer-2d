let canvas = document.getElementById("view");
let ctx = canvas.getContext("2d");

function init() {
  createEnemy(100, 100, "red");
}

function processInput() {
  playerProcessInput();
}

function update() {
  updatePlayer();
  updateEnemies();
  updateSprites();
}

function draw() {
  const camera = {
    x: 0,
    y: 0
  };

  drawTilemap(camera);
  drawSprites(camera);
  drawRockets(camera);
  drawPlayerHp();
}

function loop() {
  if (!areAllAssetsLoaded()) {
    processInput();
    update();
    draw();
  }

  requestAnimationFrame(loop);
}

init();
loop();
