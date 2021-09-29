'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GameContent.init({
    skin_user: DataTypes.STRING,
    skin_gun: DataTypes.STRING,
    skin_enemy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameContent',
  });
  return GameContent;
};