let game;

function Game() {
  game = new Phaser.Game('100%', '100%', Phaser.WEBGL, '');

  const BootState = {
    preload: Boot.preload,
    update: Boot.update,
    create: Boot.create
  };

  const MenuState = {
    update: Menu.update,
    create: Menu.create
  };

  const PlayState = {
    update: Play.update,
    create: Play.create,
    render: Play.render
  };

  const GameOverState = {
    update: GameOver.update,
    create: GameOver.create
  };

  const ForeplayState = {
    update: Foreplay.update,
    create: Foreplay.create
  };

  game.state.add('boot', BootState);
  game.state.add('menu', MenuState);
  game.state.add('play', PlayState);
  game.state.add('gameover', GameOverState);
  game.state.add('foreplay', ForeplayState);

  game.state.start('boot');
}

