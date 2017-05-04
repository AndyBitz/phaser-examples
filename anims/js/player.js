function Player() {
  Player.char = game.add.sprite(0, 0, 'hero');

  Player.initPhysics();
  Player.initControls();

  Player.char.update = Player.update;
  Player.char.scale.set(2, 2);
  Player.char.anchor.set(.5, .5);
  Player.char.x = game.world.centerX;
  Player.char.animations.add('walk');
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
    Player.char.frame = 0;
  }

  if (Player.cursors.up.isDown
    && Player.char.body.touching.down) {
    // jump
    Player.char.body.velocity.y = -350;
  }

};

Player.startWalkingAnimation = function() {
  Player.char.animations.play('walk', 10, true);
};