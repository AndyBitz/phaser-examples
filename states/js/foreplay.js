function Foreplay() {};

Foreplay.create = function() {
  const x = game.world.centerX;
  const y = game.world.centerY;

  Foreplay.text = [];
  Foreplay.tweens = [];

  Foreplay.text[0] = game.add.text(x, y, `use WASD to move`, { font: '36px monospace', fill: '#ffffff' });
  Foreplay.text[1] = game.add.text(x, y, `hit SPACE to explode`, { font: '36px monospace', fill: '#ffffff' });
  Foreplay.text[2] = game.add.text(x, y, `GO`, { font: '64px monospace', fill: '#ffffff' });

  const to = { x: 1, y: 1 };

  // skip by keypress
  game.input.keyboard.onDownCallback = function() {
    game.input.keyboard.onDownCallback = null;
    game.state.start('play');
  };

  Foreplay.text.map((text, index)=> {
    text.anchor.set(.5, .5);
    text.scale.set(0, 0);
    Foreplay.tweens[index] = game.add.tween(text.scale);
    Foreplay.tweens[index].to(to, 600, 'Bounce');
    Foreplay.tweens[index].onComplete.add(() => {
      // hide current text
      const after = game.add.tween(Foreplay.text[index].scale).to({ x: 0, y: 0 }, 400, 'Linear', true, 200).start();
      // start next tween
      const next = index+1;
      if (!Foreplay.tweens[next]) {
        after.onComplete.add(() => {
          game.state.start('play');
        });
        return;
      }
      after.onComplete.add(() => {
        Foreplay.tweens[next].start();
      });
    });
  });

  Foreplay.tweens[0].start();

};

Foreplay.update = function() {

};