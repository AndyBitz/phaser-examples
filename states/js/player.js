function Player() {}

Player.static = {};
Player.static.velocity = 10;
Player.battery = 3;

Player.static.update = function() {
  // actions
  if (Play.space.isDown && !Player.blastLock)
    Player.blast();

  // move the player
  if (Play.moveUp.isDown)
    Player.bot.y -= Player.static.velocity;

  if (Play.moveDown.isDown)
    Player.bot.y += Player.static.velocity;

  if (Play.moveRight.isDown)
    Player.bot.x += Player.static.velocity;

  if (Play.moveLeft.isDown)
    Player.bot.x -= Player.static.velocity;

  // check for border collision
  const bounds = Player.bot.getBounds();
  const x = bounds.x
  const y = bounds.y
  const x2 = x+bounds.width;
  const y2 = y+bounds.height;

  if (x < 0)
    Player.bot.x = 0+bounds.width/2;
  if (x2 > game.world.width)
    Player.bot.x = game.world.width-bounds.width/2;
  if (y < 0)
    Player.bot.y = 0+bounds.height/2;
  if (y2 > game.world.height)
    Player.bot.y = game.world.height-bounds.height/2

  // collision detection
  game.physics.arcade.overlap(Player.bot, Enemies.group, (bot, enemy) => { 
    if (Player.isHitted) return;
    Player.isHitted = true;
    Player.bot.alpha = .4;
    Player.battery -= 1;
    Player.batteryGroup.remove(Player.batteryGroup.getTop());
    game.time.events.add(Phaser.Timer.SECOND * 4, function() {
      Player.isHitted = false;
      Player.bot.alpha = 1;
    }, this);
  });

  if (Player.battery <= 0) {
    game.state.start('menu');
  }

};

Player.displayBattery = function() {
  const x = 10;
  const y = game.world.height-40;

  let battery;

  for (let i=0; i < Player.battery; i++) {
    battery = game.add.sprite(x+(35*i), y, 'battery');
    battery.width = 30;
    battery.height = 30;
    Player.batteryGroup.add(battery);
  }
};

Player.blast = function() {
  Player.blastLock = true;
  const x = Player.bot.x;
  const y = Player.bot.y;
  const blast = game.add.sprite(x, y, 'explosion');
  game.physics.enable(blast, Phaser.Physics.ARCADE);
  blast.anchor.set(.5, .5);
  blast.scale.set(0, 0);

  const blastScaleTween = game.add.tween(blast.scale);
  blastScaleTween.to({
    x: 1,
    y: 1
  }, 400, Phaser.Easing.Power3);
  blastScaleTween.start();

  const blastTween = game.add.tween(blast);
  blastTween.to({
    alpha: 0
  }, 600, Phaser.Easing.Power3);

  blastTween.onComplete.add(() => {
    blast.destroy();
  });

  blastTween.start();

  setTimeout(() => {
    // TODO
    // change from setTimeout to game time
    Player.blastLock = false;
  }, 500);

  Player.blastGroup.add(blast);
};