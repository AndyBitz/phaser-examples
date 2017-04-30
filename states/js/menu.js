function Menu() {}

Menu.create = function() {

	const fontStyle = {
		font: "32px monospace",
		fill: "#ffffff"
	};
	Menu.initText = game.add.text(game.world.centerX, game.world.centerY, 'Press W to start', fontStyle);
	Menu.initText.anchor.set(.5, .5);

	Menu.initKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
};

Menu.update = function() {
	if (Menu.initKey.isDown) {
		// TODO
		// show instructions
		// get ready
		game.state.start('play');
	}
};