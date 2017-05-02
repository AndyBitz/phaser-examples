function Game() {
  game = new Phaser.Game('100%', '100%', Phaser.WEBGL, '');

  game.state.add('boot', Game.bootState);
  game.state.add('menu', Game.menuState);
  game.state.add('play', Game.playState);
  game.state.add('over', Game.overState);

  game.state.start('boot');
}

Game.bootState = {
  preload: Boot.preload,
  create: Boot.create
};

Game.menuState = {
  create: Menu.create
};

Game.playState = {
  create: Play.create,
  update: Play.update
};

Game.overState = {
  create: Over.create
};