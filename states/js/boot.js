function Boot() {}

Boot.preload = function() {
  // load assets
  game.load.image('bot', 'res/bot.png');
  game.load.image('explosion', 'res/explosion.png');
  game.load.image('enemy', 'res/enemy.png');
},

Boot.create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

  game.state.start('menu');
};

Boot.update = function() {

};