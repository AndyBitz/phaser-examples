function Play() {}

Play.create = function() {
  Player.bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
  game.physics.enable(Player.bot, Phaser.Physics.ARCADE);
  Player.bot.anchor.set(.5, .5);
  Player.bot.scale.set(.7, .7);
  Player.bot.body.velocity.x = 0;
  Player.bot.body.velocity.y = 0;
  Player.bot.update = Player.static.update;
  Player.battery = 3;
  Player.isHitted = false;
  Player.score = 0;
  Player.static.velocity = 16;
  Player.hasMoved = false;
  Player.moveCounter = 0;

  Player.scoreText = game.add.text(10, 10, `${Player.score}`, { font: "32px Arial", fill: "#ffffff" });

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

  Player.batteryGroup = game.add.group();
  Player.displayBattery();

  GameOver.displayHighscore();
};

Play.update = function() {
  if (Play.escape.isDown) {
    // TODO
    // just freez game
    game.state.start('menu');
  }

  if (!Player.hasMoved) {
    Player.moveCounter += 1;
  } else {
    Player.moveCounter = 0;
  }

  game.physics.arcade.overlap(Player.blastGroup, Enemies.group, function(blast, enemy) {
    Player.score += 1;
    Player.scoreText.setText(`${Player.score}`);
    if (Player.score != 0 && Player.score%10 == 0) {
      game.sound.play('noice');
    }
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