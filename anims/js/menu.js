function Menu() {}

Menu.create = function() {
  // add background
  game.add.tileSprite(
    0,
    0,
    game.world.width,
    game.world.height,
    'background');

  // add text
  const startText = game.add.text(
    game.world.centerX,
    game.world.centerY,
    'hit W to start',
    { font: '64px monospace',
      fill: '#ffffff' });
  startText.anchor.set(.5, .5);

  // signal to start
  game
    .input
    .keyboard
    .addKey(Phaser.Keyboard.W)
    .onDown
    .add(() => {
      game.state.start('play');
    });
};