function Boot() {

}

Boot.preload = function() {
  // load assets
  game.load.image('background', 'res/background.png');
};

Boot.create = function() {
  // defaults
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE; 

  // switch to menu
  game.state.start('menu');
};