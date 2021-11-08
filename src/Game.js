const { promisify } = require('util');
const music = require('play-sound')((opts = {}));
const rl = require('readline');
const path = require('path');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const runInteractiveConsole = require('./keyboard');
const addUserInfoToDataBase = require('../addUserInfoToDB');

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question[promisify.custom] = (question) => new Promise((resolve) => {
  readline.question(question, resolve);
});

class Game {
  constructor({
    trackLength, rowLength, heroSkins, enemySkins, boomerangs,
  }) {
    this.enemySkins = enemySkins;
    this.heroSkins = heroSkins;
    this.trackLength = trackLength;
    this.rowLength = rowLength;
    this.boomerang = new Boomerang({ boomerangs });
    this.enemys = new Array(rowLength); // new Enemy({ trackLength: this.trackLength, enemySkins });
    this.hero = new Hero({
      positionX: 0, positionY: 4, boomerang: this.boomerang, enemy: this.enemy,
    });
    this.view = new View();
    this.track = [];
    this.level = 1;
    this.keyboard = {
      right: () => {
        this.hero.moveRight(this.trackLength);
        music.play(
          path.join(__dirname, 'sounds/glitch-in-the-matrix.wav'),
          (err) => {
            if (err) throw err;
          },
        );
      },
      left: () => {
        this.hero.moveLeft();
        music.play(
          path.join(__dirname, 'sounds/glitch-in-the-matrix.wav'),
          (err) => {
            if (err) throw err;
          },
        );
      },
      space: () => {
        this.hero.isAtacking = true;
        music.play(
          path.join(__dirname, 'sounds/just-like-magic.wav'),
          (err) => {
            if (err) throw err;
          },
        );
      },
      up: () => {
        this.hero.moveUp();
        music.play(
          path.join(__dirname, 'sounds/glitch-in-the-matrix.wav'),
          (err) => {
            if (err) throw err;
          },
        );
      },
      down: () => {
        this.hero.moveDown(this.rowLength);
        music.play(
          path.join(__dirname, 'sounds/glitch-in-the-matrix.wav'),
          (err) => {
            if (err) throw err;
          },
        );
      },
      q: () => this.stopGame(),
    };
    this.regenerateTrack();
  }

  async getUserName() {
    const username = await promisify(readline.question)('Please enter user name: ');
    this.hero.name = username;
  }

  async getUserSkin() {
    let heroSkins = '';
    this.heroSkins.forEach((heroSkin, index) => {
      heroSkins += `${index + 1}: ${heroSkin}\n`;
    });
    console.clear();
    console.log(heroSkins);
    const userSkinNumber = await promisify(readline.question)('Please choose your skin: ');
    const skinIndex = parseInt(userSkinNumber.trim(), 10) - 1;
    this.hero.skin = this.heroSkins[skinIndex];
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = [];
    for (let row = 0; row <= this.rowLength; row += 1) {
      this.track.push(new Array(this.trackLength).fill(' '));
    }
    this.enemys.forEach((enemy) => {
      if (enemy !== undefined) this.track[enemy.positionY][enemy.positionX] = enemy.skin;
    });
    this.track[this.boomerang.positionY][this.boomerang.positionX] = this.boomerang.skin;
    this.track[this.hero.positionY][this.hero.positionX] = this.hero.skin;
  }

  generateEnemys() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * this.enemys.length);
      if (this.enemys[randomNumber] === undefined) {
        this.enemys[randomNumber] = new Enemy({ trackLength: this.trackLength, enemySkins: this.enemySkins, positionY: randomNumber });
      }
    }, 500);
  }

  killEnemy(killedEnemy) {
    this.boomerang.isRightDirection = false;
    // killedEnemy.die();
    const killedEnemyIndex = this.enemys.indexOf(killedEnemy);
    this.enemys[killedEnemyIndex] = undefined;
    this.hero.winCount += 1;
    if (this.hero.winCount % 5 === 0 && this.gameSpeed > 50) {
      this.gameSpeed -= 50;
      clearInterval(this.timerId);
      this.playRound();
      this.level += 1;
    }
  }

  check() {
    this.enemys.forEach((enemy) => {
      if (enemy !== undefined && this.hero.positionX === enemy.positionX && this.hero.positionY === enemy.positionY) {
        this.hero.die();
        this.stopGame();
      }
    });

    this.enemys.forEach((enemy) => {
      if (enemy !== undefined && this.boomerang.positionX >= enemy.positionX
      && this.hero.positionY === enemy.positionY
      && this.hero.positionX < enemy.positionX) {
        this.killEnemy(enemy);
      }
    });

    if (this.boomerang.positionX <= this.hero.positionX
      && this.hero.positionY === this.boomerang.positionY) {
      this.boomerang.positionX = this.hero.positionX;
      this.hero.isAtacking = false;
      this.boomerang.isRightDirection = true;
      this.boomerang.getRandomSkin();
    }
    if (this.boomerang.positionX >= this.trackLength) {
      this.boomerang.isRightDirection = false;
    }
  }

  playRound() {
    this.timerId = setInterval(() => {
      this.hero.attack();
      this.enemys.forEach((enemy) => {
        if (enemy !== undefined) enemy.moveLeft();
      });

      this.check();
      this.regenerateTrack();
      this.view.render(this.track, this.hero.winCount, this.level);
    }, this.gameSpeed);
  }

  async play() {
    await this.getUserName();
    await this.getUserSkin();
    this.gameSpeed = 170;
    this.generateEnemys();
    runInteractiveConsole(this.keyboard);
    this.audio = music.play(
      path.join(__dirname, 'sounds/zvuk-mario.wav'),
    );

    this.playRound();
  }

  async stopGame() {
    this.audio.kill();
    clearInterval(this.timerId);
    // eslint-disable-next-line no-underscore-dangle
    this.gameTime = (this.timerId._idleStart / 1000).toFixed() * 1;
    const gameInfo = {
      gameTime: this.gameTime,
      username: this.hero.name,
      score: this.hero.winCount,
      isDead: this.hero.isDead,
    };
    await addUserInfoToDataBase(gameInfo);
    this.view.showGameResult(gameInfo);
    process.exit();
  }
}

module.exports = Game;
