class View {
  render(track, scores, level) {
    const yourTeamName = 'Tigers';
    this.track = track;
    // Тут всё рисуем.
    console.clear();
    let difficult = '';
    switch (level) {
      case 1: {
        difficult = 'Easy';
        break;
      }
      case 2: {
        difficult = 'Medium';
        break;
      }
      case 3: {
        difficult = 'Hard';
        break;
      }
      default: {
        difficult = 'Super Hard';
        break;
      }
    }
    let trackTable = '';
    this.track.forEach((line) => {
      trackTable += `${line.join('')}\n`;
    });

    console.log(trackTable);
    console.log('\n\n');
    console.log(`Scores: ${scores}`);
    console.log(`Difficult: ${difficult}`);
    console.log(`Created by "${yourTeamName}" with love`);
    console.log('Press "q" to stop the Game...');
  }

  // eslint-disable-next-line class-methods-use-this
  showGameResult({
    username, gameTime, score, isDead,
  }) {
    console.clear();
    if (isDead) {
      console.log('YOU ARE DEAD!💀');
    }
    console.log(`Username was ${username}`);
    console.log(`${username} played for ${gameTime} seconds`);
    console.log(`And get ${score} scores`);
  }
}

module.exports = View;
