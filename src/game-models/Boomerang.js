// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor({ boomerangs }) {
    this.skins = boomerangs;
    this.getRandomSkin();
    this.positionX = 0;
    this.positionY = 4;
    this.isRightDirection = true;
  }

  getRandomSkin() {
    const randomNumber = Math.floor(Math.random() * this.skins.length);
    this.skin = this.skins[randomNumber];
  }

  fly() {
    this.moveRight();
    this.moveLeft();
  }

  moveLeft() {
    // Идём влево.
    this.positionX -= 2;
  }

  moveRight() {
    // Идём вправо.
    this.positionX += 2;
  }
}

module.exports = Boomerang;
