let rockets = [];

const ROCKET_MOVE_SPEED = 8;
const ROCKET_IMAGE = loadImage("assets/rocket.png");

const ROCKET_RECT = {
  x: 0,
  y: 0,
  w: 64,
  h: 64
};

function createRocket(x, y, angle) {
  let rocket = {
    x: x,
    y: y,
    angle: angle,
    dx: Math.cos(angle) * ROCKET_MOVE_SPEED,
    dy: Math.sin(angle) * ROCKET_MOVE_SPEED
  };

  rockets.push(rocket);

  return rocket;
}

function removeRocket(rocket) {
  let i = rockets.indexOf(rocket);

  if (i < 0) return;

  rockets.splice(i, 1);
}

function updateRockets() {
  for (let i = 0; i < rockets.length; ++i) {
    let rocket = rockets[i];

    rocket.x += rocket.dx;
    rocket.y += rocket.dy;

    // check if rocket hit wall
    if (
      collideTileMap(
        rocket.x + ROCKET_COLLISION_OFFSET_X,
        rocket.y + ROCKET_COLLISION_OFFSET_Y,
        ROCKET_COLLISION_W,
        ROCKET_COLLISION_H
      )
    ) {
      // TODO: Explosion animation
      removeRocket(rocket);
    }

    if (
      collideRects(
        rocket.x + ROCKET_RECT.x,
        rocket.y + ROCKET_RECT.y,
        ROCKET_RECT.w,
        ROCKET_RECT.h,
        player.sprite.x + PLAYER_RECT.x,
        player.sprite.y + PLAYER_RECT.y,
        PLAYER_RECT.w,
        PLAYER_RECT.h
      )
    ) {
      // TODO: play explosion anim
      player.hp -= 1;
      removeRocket(rocket);
    }
  }
}

function drawRockets(camera) {
  for (let i = 0; i < rockets.length; ++i) {
    let rocket = rockets[i];
    // draw rotated rockets
    ctx.save();
    ctx.translate(rocket.x - camera.x, rocket.y - camera.y);
    ctx.rotate(rocket.angle);
    ctx.drawImage(
      ROCKET_IMAGE,
      -ROCKET_IMAGE.width / 2,
      -ROCKET_IMAGE.height / 2
    );
    ctx.restore();
  }
}
