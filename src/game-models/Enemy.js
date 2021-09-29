// Враг.
const music = require('play-sound')((opts = {}));
const path = require('path');

class Enemy {
  constructor({ trackLength, enemySkins, positionY }) {
    this.skins = enemySkins;
    this.getRandomSkin();
    this.trackLength = trackLength;
    this.positionX = this.trackLength - 1;
    this.positionY = positionY;
    this.speed = 1;
  }

  getRandomSkin() {
    const randomNumber = Math.floor(Math.random() * this.skins.length);
    this.skin = this.skins[randomNumber];
  }

  moveLeft() {
    // Идём влево.
    this.positionX -= this.speed;
    if (this.positionX <= 0) {
      this.positionX = this.trackLength - 1;
    }
  }

  die() {
    this.positionX = this.trackLength - 1;
    music.play(
      path.join(__dirname, '../sounds/congratulations.wav'),
      (err) => {
        if (err) throw err;
      },
    );
  }
}

module.exports = Enemy;
