function Player() {
  Player.char = game.add.sprite(0, 0, 'collection', 'hero/idle/frame1.png');

  Player.initPhysics();
  Player.initControls();

  Player.char.update = Player.update;
  Player.char.scale.set(2, 2);
  Player.char.anchor.set(.5, .5);
  Player.char.x = game.world.centerX;

  Player.char.animations.add(
    'walk',
    Phaser.Animation.generateFrameNames('hero/walk/frame', 1, 6, '.png'),
    60,
    true,
    false
  );

  Player.char.animations.add(
    'idle',
    Phaser.Animation.generateFrameNames('hero/idle/frame', 1, 8, '.png'),
    60,
    true,
    false
  );

  Player.weapon = game.add.weapon(30, 'collection', 'misc/shmup-bullet.png');
  Player.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  Player.weapon.bulletSpeed = 600;
  Player.weapon.fireRate = 100;

  // false, to be able to change the fireAngle of the weapon
  Player.weapon.trackSprite(Player.char, 30, 0, false);
  Player.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

Player.initControls = function() {
  Player.cursors = game
                    .input
                    .keyboard
                    .createCursorKeys();
};

Player.fireControl = function() {
  if (Player.fireButton.isDown) {
    Player.weapon.fire();
  }
};

Player.hitDetection = function() {
  game.physics.arcade.overlap(
    Player.weapon.bullets,
    Enemy.group,
    Player.hitDetectionCallback,
    null,
    this
  );
};

Player.hitDetectionCallback = function(bullet, enemy) {
  enemy.damage(20);
  bullet.kill();
};

Player.update = function() {
  Player.movement();
  Player.fireControl();
  Player.hitDetection();
};

Player.initPhysics = function() {
  game.physics.arcade.enable(Player.char);
  Player.char.body.gravity.y = 1000;
  Player.char.body.collideWorldBounds = true;
};

Player.movement = function() {
  Player.char.body.velocity.x = 0;

  if (Player.cursors.left.isDown) {
    // move left
    Player.char.body.velocity.x = -200;
    Player.startWalkingAnimation();
    Player.char.scale.x = 2 * -1;
    Player.weapon.fireAngle = Phaser.ANGLE_LEFT;
  } else if (Player.cursors.right.isDown) {
    // move right
    Player.char.body.velocity.x = 200;
    Player.startWalkingAnimation();
    Player.char.scale.x = 2 * 1;
    Player.weapon.fireAngle = Phaser.ANGLE_RIGHT;
  } else {
    // don't move
    Player.char.animations.stop('walk');
    Player.startIdleAnimation();
  }

  if (Player.cursors.up.isDown
    && Player.char.body.onFloor()) {
    // jump
    Player.char.body.velocity.y = -500;
  }

  const playerBounds = Player.char.getBounds();
  const playerLastY = playerBounds.y+playerBounds.height;
  const playerOnGround = (playerLastY > (game.world.height-50))

  if (Player.char.body.velocity.y < -1 || !playerOnGround) {
    Player.char.frameName = 'hero/jump/frame2.png';
  }
};

Player.startJumpingAnimation = function() {
  Player.char.frameName = 'hero/jump/frame2.png';
};

Player.startWalkingAnimation = function() {
  Player.char.animations.play('walk', 10, true);
};

Player.startIdleAnimation = function() {
  Player.char.animations.play('idle', 10, true);
}