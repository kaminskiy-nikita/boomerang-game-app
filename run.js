// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const getPlayersSkinFromDB = require('./getPlayersSkinFromDB');

async function run() {
  const playersSkins = await getPlayersSkinFromDB();

  console.clear();

  const heroSkins = [];
  const enemySkins = [];
  const boomerangs = [];
  playersSkins.forEach((skins) => {
    heroSkins.push(skins.skin_user);
    enemySkins.push(skins.skin_enemy);
    boomerangs.push(skins.skin_gun);
  });

  // Инициализация игры с настройками.
  const game = new Game({
    trackLength: 30,
    rowLength: 8,
    heroSkins,
    enemySkins,
    boomerangs,
  });

  // Запуск игры.
  game.play();
}

run();
