function Player() {
  Player.char = game.add.sprite(0, 0, 'hero');

  Player.initPhysics();
  Player.initControls();

  Player.char.update = Player.update;
  Player.char.scale.set(2, 2);
  Player.char.x = game.world.centerX;
  // Player.char.y = game.world.height-Player.char.height;
  Player.char.animations.add('walk');
}

Player.initControls = function() {
  Player.moveRightKey = game
                          .input
                          .keyboard
                          .addKey(Phaser.Keyboard.D);
  Player.moveLeftKey  = game
                          .input
                          .keyboard
                          .addKey(Phaser.Keyboard.A);
};

Player.update = function() {

};

Player.initPhysics = function() {
  game.physics.arcade.enable(Player.char);
  Player.char.body.gravity.y = 1000;
  Player.char.body.collideWorldBounds = true;
};

Player.startWalking = function() {
  Player.char.animations.play('walk', 10, true);
  Player.char.body.velocity.x = +200;
};

Player.stopWalking = function() {
  Player.char.animations.stop('walk');
  Player.char.body.velocity.x = 0;
};