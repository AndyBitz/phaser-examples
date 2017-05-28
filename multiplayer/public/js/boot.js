function Boot() {}

Boot.preload = () => {
	game.load.image('rect', '/res/rect.png');
	game.load.image('poly', '/res/poly.png');
	game.load.image('startGameButton', '/res/startButton.png');
	game.load.image('joinGameButton', '/res/joinButton.png');
};

Boot.create = () => {
	game.state.start('menu');
};