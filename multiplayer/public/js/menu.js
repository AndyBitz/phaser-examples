function Menu() {};

Menu.create = () => {

  // create session
  Game.session = Game.createSession();

  // display session
  const sessionText = game.add.text(
    game.world.centerX,
    game.world.centerY-40,
    `session: ${Game.session}`,
    { font: '36px monospace',
      fill: '#ffffff' });
  sessionText.inputEnabled = true;
  sessionText.anchor.set(.5, .5);
  sessionText.events.onInputUp.add(Menu.sessionEvent, this);

  // start game and wait till someone joins button
  const startButton = game.add.button(
    game.world.centerX,
    game.world.centerY,
    'startGameButton',
    Menu.onStartAction,
    this,
    2,
    1,
    0);
  startButton.anchor.set(.5, 0);
};

Menu.onStartAction = () => {
  // register session key on server
  Game.socket.emit('register session', { key: Game.session });

  // TODO
  // server needs to check if session already exists and join if so
  // otherwise wait till someone joins
};

Menu.sessionEvent = () => {
  // TODO
  // allow to enter new session key
  // validate session key (same on server)
  // set session key
};