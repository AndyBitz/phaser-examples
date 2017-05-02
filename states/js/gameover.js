function GameOver() {}

GameOver.highscore = 0;

GameOver.create = function() {
  GameOver.highscore = (GameOver.highscore < Player.score) ? Player.score : GameOver.highscore;

  GameOver.deathText = game.add.text(game.world.centerX, game.world.centerY-64, `Game Over`, { font: '32px monospace', fill: '#ffffff' });
  GameOver.deathText.anchor.set(.5, .5);

  GameOver.scoreText = game.add.text(game.world.centerX, game.world.centerY, `${Player.score}`, { font: '64px monospace', fill: '#ffffff' });
  GameOver.scoreText.anchor.set(.5, .5);

  GameOver.contText = game.add.text(game.world.centerX, game.world.centerY+64, `press W to start again`, { font: '32px monospace', fill: '#ffffff' });
  GameOver.contText.anchor.set(.5, .5);

  GameOver.restartKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

  GameOver.displayHighscore();

  game.sound.play('over');

};

GameOver.update = function() {
  if (GameOver.restartKey.isDown)
    game.state.start('foreplay');
};

GameOver.displayHighscore = function() {
  if (!GameOver.highscore) return;
  GameOver.highScoreText = game.add.text(game.world.width-10, 10, `Highscore: ${GameOver.highscore}`, { font: '32px monospace', fill: '#ffffff' });
  GameOver.highScoreText.anchor.set(1, 0);
};