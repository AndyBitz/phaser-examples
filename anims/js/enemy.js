function Enemy() {
  Enemy.group = game.add.group();
  Enemy.spawn();
}

Enemy.spawn = function() {
  const enemy = game.add.sprite(0, 0, 'collection', 'enemy/frame1.png');
  // defaults
  enemy.health = 10;

  // physics
  game.physics.arcade.enable(enemy);
  enemy.body.gravity.y = 1000;
  enemy.body.collideWorldBounds = true;
  enemy.body.velocity.x = 20;
  
  // add to group
  Enemy.group.add(enemy);
};