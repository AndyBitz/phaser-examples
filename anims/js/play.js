function Play() {

}

Play.create = function() {
  // add background
  game.add.tileSprite(
    0,
    0,
    game.world.width,
    game.world.height,
    'background');

  // init player
  Player();
};

Play.update = function() {

};