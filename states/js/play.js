function Play() {}

Play.create = function() {
  Player.bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
  game.physics.enable(Player.bot, Phaser.Physics.ARCADE);
  Player.bot.anchor.set(.5, .5);
  Player.bot.scale.set(.7, .7);
  Player.bot.body.velocity.x = 0;
  Player.bot.body.velocity.y = 0;
  Player.bot.update = Player.static.update;

  Play.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
  Play.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
  Play.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  Play.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);

  Play.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  Play.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

  Enemies.group = game.add.group();
  Player.blastGroup = game.add.group();

  Play.lastTime = game.time.time;
  Play.spawnTimeCounter = 0;
};

Play.update = function() {
  if (Play.escape.isDown) {
    // TODO
    // just freez game
    game.state.start('menu');
  }

  game.physics.arcade.overlap(Player.blastGroup, Enemies.group, function(blast, enemy) {
    // console.log('blast over enemy');
    enemy.destroy();
  });

  const currentTime = game.time.time;
  Play.spawnTimeCounter += currentTime-Play.lastTime;
  if (Play.spawnTimeCounter >= Enemies.spawnTime) {
    Play.spawnTimeCounter = 0;
    Enemies.spawn();
  }
  Play.lastTime = currentTime;
};

Play.render = function() {
  // game.debug.spriteInfo(Player.bot, 24, 24);
}