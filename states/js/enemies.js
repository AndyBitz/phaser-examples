function Enemies() {};

Enemies.static = {};
Enemies.spawnTime = 1400;

Enemies.spawn = function() {
  const x = game.world.width;
  const y = game.rnd.integerInRange(0, game.world.height);

  const enemy = game.add.sprite(x, y, 'enemy');
  enemy.anchor.set(.5, .5);
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  enemy.body.velocity.x = -600;
  enemy.update = Enemies.static.update(enemy);

  Enemies.group.add(enemy);
};

Enemies.static.update = function(enemy) {
  return function() {
    const bounds = enemy.getBounds();
    if (bounds.x < 0-enemy.width) {
      enemy.destroy();
    }
  };
};