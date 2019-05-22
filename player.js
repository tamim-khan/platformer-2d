let player = {
  sprite: createSprite({
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
  }),

  dx: 0,
  dy: 0,

  grounded: false
};

function playerProcessInput() {
  player.grounded = collideTileMap(
    player.sprite.x,
    player.sprite.y + 1,
    128,
    128
  );

  if (input.left) {
    player.dx = -4;
    player.sprite.flip = true;
  } else if (input.right) {
    player.dx = 4;
    player.sprite.flip = false;
  } else {
    player.dx = 0;
  }
}

function updatePlayer() {
  player.dy += 0.3;

  if (player.dy > 15) {
    player.dy = 15;
  }

  if (!collideTileMap(player.sprite.x + player.dx, player.sprite.y, 128, 128)) {
    player.sprite.x += player.dx;
  } else {
    player.dx = 0;
  }

  if (!collideTileMap(player.sprite.x, player.sprite.y + player.dy, 128, 128)) {
    player.sprite.y += player.dy;
  } else {
    player.dy = 0;
  }
}
