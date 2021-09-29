const { GameContent } = require('./models');

async function getPlayersSkinFromDB() {
  return GameContent.findAll();
}

module.exports = getPlayersSkinFromDB;
