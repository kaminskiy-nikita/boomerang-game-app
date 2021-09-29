'use strict'
const emodziEnemy = ['👹', '😈', '👽', '👺', '👾', '👹', '😈', '👽', '👺', '👾']
const emodziUser = [🦴, '🐶', '🦊', '🦝', '🐱', '🦁', '🐯', '🐮', '🐷', '🐼']
const emodziGun = ['🦴', '🏹', '🥝', '🥐', '⚽', '🍅', '🎱', '🥔', '🍔', '🏐']


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
