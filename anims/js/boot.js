function Boot() {

}

Boot.preload = function() {
  // load assets
  game.load.image('background', 'res/background.png');
  game.load.atlas(
    'hero',
    'res/hero_walk.png',
    'res/hero_walk.json',
    Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
};

Boot.create = function() {
  // defaults
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE; 

  // switch to menu
  game.state.start('menu');
};