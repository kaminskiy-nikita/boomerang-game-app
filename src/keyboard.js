// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const readline = require('readline');

function runInteractiveConsole(keyboard) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    // else {
    //   console.log(`You pressed the "${str}" key`);
    //   console.log();
    //   console.log(key.name);
    //   console.log();
    // }

    if (key.name in keyboard) {
      keyboard[key.name]();
    }
  });
}

// runInteractiveConsole({});
// Давай попробуем запустить этот скрипт!

module.exports = runInteractiveConsole;
