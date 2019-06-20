const ENEMY_ACCEL = 2;
const ENEMY_DRAG_FACTOR = 0.9;
const ENEMY_CLOSE_ENOUGH_DISTANCE = 200;
const ENEMY_REPULSION_ACCEL = 5;
const ENEMY_RADIUS = 64;
const ENEMY_SHOOT_COOLDOWN = 2.0;
const ENEMY_MOVE_SPEED = 5;

let enemies = [];

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

function createEnemy(x, y, color) {
  let enemy = {
    sprite: createSprite(ENEMY_SPRITE_INFO[color]),
    color: color,
    dx: 0,
    dy: 0,
    cooldownTimer: 0
  };

  playAnim(enemy.sprite, "idle");

  enemy.sprite.x = x;
  enemy.sprite.y = y;

  enemy.state = enemyChasePlayer;

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
    // Collision with other enemies
    for (let j = i + 1; j < enemies.length; ++j) {
      let otherEnemy = enemies[j];

      const fw2 = enemy.sprite.info.frameWidth / 2;
      const fh2 = enemy.sprite.info.frameHeight / 2;

      if (
        collideCircles(
          enemy.sprite.x + fw2,
          enemy.sprite.y + fh2,
          ENEMY_RADIUS,
          otherEnemy.sprite.x + fw2,
          otherEnemy.sprite.y + fh2,
          ENEMY_RADIUS
        )
      ) {
        const distX = enemy.sprite.x + fw2 - (otherEnemy.sprite.x + fw2);
        const distY = enemy.sprite.y + fh2 - (otherEnemy.sprite.y + fh2);

        // direction matters
        const angle = Math.atan2(distY, distX);

        const ddx = Math.cos(angle) * ENEMY_REPULSION_ACCEL;
        const ddy = Math.sin(angle) * ENEMY_REPULSION_ACCEL;

        enemy.dx += ddx;
        enemy.dy += ddy;

        otherEnemy.dx -= ddx;
        otherEnemy.dy -= ddy;
      }
    }

    if (enemy.cooldownTimer > 0) {
      enemy.cooldownTimer -= SEC_PER_FRAME;
    }

    if (enemy.state) {
      enemy.state(enemy);
    }

    // Updating enemy speed
    enemy.sprite.x += enemy.dx;
    enemy.sprite.y += enemy.dy;

    enemy.dx *= ENEMY_DRAG_FACTOR;
    enemy.dy *= ENEMY_DRAG_FACTOR;
  }
}

// enemy states

function enemyChasePlayer(enemy) {
  const distX = player.sprite.x - enemy.sprite.x;
  const distY = player.sprite.y - enemy.sprite.y;

  const dist2 = distX * distX + distY * distY;

  if (dist2 < ENEMY_CLOSE_ENOUGH_DISTANCE * ENEMY_CLOSE_ENOUGH_DISTANCE) {
    enemy.state = enemyFireRockets;
    return;
  }

  const angle = Math.atan2(distY, distX);

  enemy.dx += Math.cos(angle) * ENEMY_ACCEL;
  enemy.dy += Math.sin(angle) * ENEMY_ACCEL;
}

function enemyFireRockets(enemy) {
  const dist2 = distX * distX + distY * distY;

  if (dist2 > ENEMY_CLOSE_ENOUGH_DISTANCE * ENEMY_CLOSE_ENOUGH_DISTANCE) {
    enemy.state = enemyChasePlayer;
    return;
  }
  const angle = Math.atan2(distY, distX);
  if (enemy.cooldownTimer <= 0) {
    enemy.cooldownTimer += ENEMY_SHOOT_COOLDOWN;
    createRocket(enemy.sprite.x, enemy.sprite.y, angle);
  }
}
