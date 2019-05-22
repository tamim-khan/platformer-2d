let input = {
  left: false,
  right: false,
  jump: false,
  duck: false
};

let player = {
  x: 0,
  y: 0
};

let canvas = document.getElementById("view");
let ctx = canvas.getContext("2d");

let heartImage = loadImage("heart.png");

let spriteInfo = {
  image: loadImage("assets/player.png"),

  frameWidth: 128,
  frameHeight: 128,

  anims: {
    run: {
      startFrame: 6,
      length: 7,
      frameTime: 0.08
    }
  }

  //onLoop: function(sprite) {
  //}
};

let sprite = createSprite(spriteInfo);

playAnim(sprite, "run");

window.addEventListener("keydown", function(e) {
  if (e.key == "a") {
    input.left = true;
  } else if (e.key == "d") {
    input.right = true;
  } else if (e.key == "w") {
    input.jump = true;
  } else if (e.key == "s") {
    input.duck = true;
  }
});

window.addEventListener("keyup", function(e) {
  if (e.key == "a") {
    input.left = false;
  } else if (e.key == "d") {
    input.right = false;
  } else if (e.key == "w") {
    input.jump = false;
  } else if (e.key == "s") {
    input.duck = false;
  }
});

function processInput() {
  if (input.left) {
    sprite.x -= 4;
    console.log("Left");
  } //else
  if (input.right) {
    sprite.x += 4;
    console.log("Right");
  } //else
  if (input.jump) {
    sprite.y -= 4;
    console.log("Jump");
  } //else
  if (input.duck) {
    sprite.y += 5;
    console.log("Jump");
  } //else {
  //console.log("Nothing");
  //}
}

function update() {
  updateSprites();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ctx.fillStyle = "red";
  //ctx.fillRect(player.x, player.y, 32, 32);

  //ctx.drawImage(sprite, player.x, player.y);

  let camera = {
    x: 100,
    y: 100
  };

  drawSprites(camera);
}

function loop() {
  if (areAllAssetsLoaded()) {
    processInput();
    update();
    draw();
  }

  requestAnimationFrame(loop);
}

loop();
