function Player() {
  Player.char = game.add.sprite(0, 0, 'hero');

  Player.initPhysics();
  Player.initControls();

  Player.char.update = Player.update;
  Player.char.scale.set(2, 2);
  Player.char.anchor.set(.5, .5);
  Player.char.x = game.world.centerX;
  Player.char.animations.add(
    'walk',
    Phaser.Animation.generateFrameNames('walk/frame', 1, 6, '.png'),
    60,
    true,
    false
  );
  Player.char.animations.add(
    'idle',
    Phaser.Animation.generateFrameNames('idle/frame', 1, 8, '.png'),
    60,
    true,
    false
  );
}

Player.initControls = function() {
  Player.cursors = game
                    .input
                    .keyboard
                    .createCursorKeys();
};

Player.update = function() {
  Player.movement();
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
  } else if (Player.cursors.right.isDown) {
    // move right
    Player.char.body.velocity.x = 200;
    Player.startWalkingAnimation();
    Player.char.scale.x = 2 * 1;
  } else {
    // don't move
    Player.char.animations.stop('walk');
    Player.startIdleAnimation();
  }

  if (Player.cursors.up.isDown
    && Player.char.body.onFloor()) {
    // jump
    Player.char.body.velocity.y = -350;
  }

};

Player.startWalkingAnimation = function() {
  Player.char.animations.play('walk', 10, true);
};

Player.startIdleAnimation = function() {
  Player.char.animations.play('idle', 10, true);
}