const ENEMY_ACCEL = 2;
const ENEMY_DRAG_FACTOR = 0.9;
const ENEMY_CLOSE_ENOUGH_DISTANCE = 200;

const ENEMY_ANIMS = {
  idle: {
    startFrame: 0,
    length: 1,
    frameTime: 1
  }
};

const ENEMY_SPRITE_INFO = {
  red: {
    image: loadImage("assets/redenemy.png"),

    frameWidth: 128,
    frameHeight: 128,

    anims: ENEMY_ANIMS
  },

  blue: {
    image: loadImage("assets/blueenemy.png"),

    frameWidth: 128,
    frameHeight: 128,

    anims: ENEMY_ANIMS
  },

  yellow: {
    image: loadImage("assets/yellowenemy.png"),

    frameWidth: 128,
    frameHeight: 128,

    anims: ENEMY_ANIMS
  }
};

const ENEMY_MOVE_SPEED = 5;

let enemies = [];

function createEnemy(x, y, color) {
  let enemy = {
    sprite: createSprite(ENEMY_SPRITE_INFO[color]),
    color: color,
    dx: 0,
    dy: 0
  };

  playAnim(enemy.sprite, "idle");

  enemy.sprite.x = x;
  enemy.sprite.y = y;

  enemies.push(enemy);

  return enemy;
}

function removeEnemy(enemy) {
  let index = enemies.indexOf(enemy);

  if (index < 0) {
    return;
  }

  enemies.splice(index, 1);
}

function updateEnemies() {
  for (let i = 0; i < enemies.length; ++i) {
    let enemy = enemies[i];

    const distX = player.sprite.x - enemy.sprite.x;
    const distY = player.sprite.y - enemy.sprite.y;
    const dist2 = distX * distX + distY * distY;

    if (dist2 < ENEMY_CLOSE_ENOUGH_DISTANCE * ENEMY_CLOSE_ENOUGH_DISTANCE) {
      const angle = Math.atan2(distY, distX);

      enemy.dx += Math.cos(angle) * ENEMY_ACCEL;
      enemy.dy += Math.sin(angle) * ENEMY_ACCEL;
    }

    enemy.sprite.x += enemy.dx;
    enemy.sprite.y += enemy.dy;

    enemy.dx *= ENEMY_DRAG_FACTOR;
    enemy.dy *= ENEMY_DRAG_FACTOR;
  }
}
