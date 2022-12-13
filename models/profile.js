'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Profile.init({
    userId: DataTypes.INTEGER,
    about: DataTypes.STRING(1000),
    experience: DataTypes.INTEGER,
    companies: DataTypes.INTEGER,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    completed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profile'
  });
  return Profile;
};