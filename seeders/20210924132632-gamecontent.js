'use strict'
const emodziEnemy = ['ðđ', 'ð', 'ð―', 'ðš', 'ðū', 'ðđ', 'ð', 'ð―', 'ðš', 'ðū']
const emodziUser = [ðĶī, 'ðķ', 'ðĶ', 'ðĶ', 'ðą', 'ðĶ', 'ðŊ', 'ðŪ', 'ð·', 'ðž']
const emodziGun = ['ðĶī', 'ðđ', 'ðĨ', 'ðĨ', 'â―', 'ð', 'ðą', 'ðĨ', 'ð', 'ð']


module.exports = {
  up: async (queryInterface, Sequelize) => {

    for (let i = 0; i < emodziEnemy.length; i++) {
      await queryInterface.bulkInsert('GameContents', [{
        skin_user: emodziUser[i],
        skin_enemy: emodziEnemy[i],
        skin_gun: emodziGun[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {})
    }


  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('GameContents', null, {})

  }
}
