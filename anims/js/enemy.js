function Enemy() {
  Enemy.group = game.add.group();
  Enemy.spawn();
}

Enemy.spawn = function() {
  const enemy = game.add.sprite(0, 0, 'collection', 'enemy/frame1.png');
  const direction = game.rnd.integerInRange(0, 1);
  const velocity = game.rnd.integerInRange(45, 75);

  // defaults
  enemy.health = 10;
  enemy.update = () => {

  };

  // position
  enemy.x = direction ? 0 : game.world.width-enemy.width;
  enemy.y = game.world.centerX;

  // physics
  game.physics.arcade.enable(enemy);
  enemy.body.gravity.y = 1000;
  enemy.body.collideWorldBounds = true;
  enemy.body.velocity.x = direction ? velocity : -velocity;
  enemy.body.bounce.set(1);

  // add to group
  Enemy.group.add(enemy);
};