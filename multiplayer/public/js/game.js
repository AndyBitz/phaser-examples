function Game() {
  game = new Phaser.Game('100%', '100%', Phaser.WEBGL, '');
	Game.socket = io.connect(`${location.host}`);

  game.state.add('boot', Game.bootState);
  game.state.add('menu', Game.menuState);
  game.state.add('wait', Game.waitState);
  game.state.add('play', Game.playState);
  game.state.add('end', Game.endState);

  game.state.start('boot');
}

Game.createSession = () => {
  const time = new Date().getTime();
  const salt = Math.round(Math.random()*100000);
  const pepper = Math.round(Math.random()*2);
  const key = `${(time+salt).toString(36).toUpperCase()}${pepper.toString(36).toUpperCase()}`;
  return key;
};

Game.bootState = {
  // load assets and go to menu
  preload: Boot.preload,
  create: Boot.create
};

Game.menuState = {
  // create session and let others join
  create: Menu.create
};

Game.waitState = {
  // wait for others to join and show current session
  create: Wait.create
};

Game.playState = {
  // play the game
  create: Play.create
};

Game.endState = {
  // rematch or exit option
  create: End.create
};