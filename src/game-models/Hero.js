// Наш герой.
const music = require('play-sound')((opts = {}));
const path = require('path');

class Hero {
  constructor({
    positionX, positionY, boomerang, enemy,
  }) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.boomerang = boomerang;
    this.boomerang.position = this.positionX;
    this.enemy = enemy;
    this.isAtacking = false;
    this.winCount = 0;
    this.isDead = false;
  }

  // getRandomSkin(skins) {
  //   const randomNumber = Math.floor(Math.random() * skins.length);
  //   this.skin = skins[randomNumber];
  // }

  moveLeft() {
    this.positionX -= this.positionX - 1 >= 0 ? 1 : 0;
    this.boomerang.positionX -= this.boomerang.positionX - 1 >= 1 ? 1 : 0;
  }

  moveRight(limit) {
    this.positionX += this.positionX <= limit ? 1 : 0;
    this.boomerang.positionX += this.boomerang.positionX <= (limit) ? 1 : 0;
  }

  moveUp() {
    this.positionY -= this.positionY - 1 >= 0 ? 1 : 0;
    this.boomerang.positionY -= this.boomerang.positionY - 1 >= 0 ? 1 : 0;
  }

  moveDown(limit) {
    this.positionY += this.positionY + 1 < limit ? 1 : 0;
    this.boomerang.positionY += this.boomerang.positionY + 1 < limit ? 1 : 0;
  }

  attack() {
    // Атакуем.
    if (this.isAtacking) {
      if (this.boomerang.isRightDirection) {
        this.boomerang.moveRight();
      } else {
        this.boomerang.moveLeft();
      }
    }
  }

  die() {
    this.isDead = true;
    music.play(
      path.join(__dirname, '../sounds/twirl.wav'),
      (err) => {
        if (err) throw err;
      },
    );
  }
}

module.exports = Hero;
