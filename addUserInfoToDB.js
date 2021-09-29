const { UserTable } = require('./models');

async function addUserInfoToDataBase({ username, gameTime, score }) {
  const user = await UserTable.create({
    username,
    time: gameTime,
    score,
  });
}

module.exports = addUserInfoToDataBase;
