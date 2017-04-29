function main() {
  new Game();
}

class Game {
  constructor() {
    this.game = new Phaser.Game('100%', '100%', Phaser.WEBGL, 'game', {
      preload: this.onPreload.bind(this),
      create: this.onCreate.bind(this),
      update: this.onUpdate.bind(this)
    });
  }

  onPreload() {
    this.game.load.image('star', 'res/star.png');
  }

  onCreate() {
    const game = this.game;
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.star = game.add.sprite(0, 10, 'star');
    this.star.x = this.game.width/2 - this.star.width/2;
    this.star.inputEnabled = true;
    this.star.input.enableDrag();

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.lastTime = game.time.time;
    this.timeElapsed = 0;

    this.foeCounter = 0;
    this.scoreText = game.add.text(0, 0, `${this.foeCounter}`, {font: "32px Arial", fill: "#ffffff"});

    this.createFoe();
  }

  onUpdate() {
    this.spawnFoeInterval();
    this.handleInputs();
    this.scoreText.setText(`${this.foeCounter}`);
  }

  handleInputs() {
    const velocity = 18;
    if (this.upKey.isDown) {
      this.star.y -= velocity;
    }
    if (this.downKey.isDown) {
      this.star.y += velocity;
    }
    if (this.leftKey.isDown) {
      this.star.x -= velocity;
    }
    if (this.rightKey.isDown) {
      this.star.x += velocity;
    }

    if (this.space.isDown) {
      this.createBlast();
    }
  }

  spawnFoeInterval() {
    const currentTime = this.game.time.time;
    this.timeElapsed += currentTime-this.lastTime;

    if (this.timeElapsed > 3000) {
      this.spawnFoe();
      this.timeElapsed = 0;
    }

    this.lastTime = currentTime;
  }

  createFoe() {
    this.foes = this.game.add.group();
    this.spawnFoe();
  }

  spawnFoe() {
    const x = this.game.world.width;
    const y = this.game.rnd.integerInRange(0, this.game.world.height-this.game.cache.getImage('star').height);
    const foe = this.game.add.sprite(x, y, 'star');
    this.game.physics.enable(foe, Phaser.Physics.ARCADE);
    foe.anchor.setTo(.5, .5);
    foe.tint = 0xff3333;
    foe.body.velocity.x = -600;
    foe.update = function() {
      foe.angle -= 3;
      if (foe.x < -200) {
        foe.kill();
      }
    }
    this.foes.add(foe);
  }

  createBlast() {
    if (this.blastLock) return;
    this.blastLock = true;
    setTimeout(() => {
      this.blastLock = false;
    }, 400);
    const x = this.star.x + this.star.height/2;
    const y = this.star.y + this.star.width/2;
    const blast = this.game.add.sprite(x, y, 'star');
    blast.anchor.setTo(0.5, 0.5);
    blast.angle = this.game.rnd.integer(0, 360);
    blast.tint = 0x00ff00;
    
    this.game.physics.enable(blast, Phaser.Physics.ARCADE);

    const blastTweenScale = this.game.add.tween(blast.scale);
    blastTweenScale.to({ x: 3, y: 3 }, 140, 'Linear');
    
    const blastTween = this.game.add.tween(blast);
    blastTween.to({ alpha: 0 }, 140, 'Linear');

    blastTween.onComplete.add(() => {
      blast.destroy();
    }, this);

    blast.update = (function() {
      this.game.physics.arcade.overlap(blast, this.foes, function (blast, foe) {
        foe.destroy();
        this.foeCounter++;
      }, null, this);
    }).bind(this);

    blastTween.start();
    blastTweenScale.start();
  }

  starBounceTween() {
    const bounce = this.game.add.tween(this.star);
    bounce.to({
      y: (this.star.y >= this.game.world.height) ? 0 : this.game.world.height
    }, 2000, Phaser.Easing.Bounce.Out);
    bounce.onComplete.add(this.starBounceTween, this);
    bounce.start();
  }

}
