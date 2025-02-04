const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

}, {
  indexes: [
    {
      unique: true,
      fields: ['title', 'description']
    }
  ]
});

module.exports = Item;
