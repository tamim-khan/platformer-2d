let canvas = document.getElementById("view");
let ctx = canvas.getContext("2d");

function processInput() {
  playerProcessInput();
}

function update() {
  updatePlayer();
  updateSprites();
}

function draw() {
  const camera = {
    x: 0,
    y: 0
  };

  drawTilemap(camera);
  drawSprites(camera);
}

function loop() {
  if (!areAllAssetsLoaded()) {
    processInput();
    update();
    draw();
  }

  requestAnimationFrame(loop);
}

loop();
