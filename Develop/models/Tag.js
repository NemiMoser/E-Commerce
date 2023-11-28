const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    allowNull: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Tag',
  }
);

module.exports = Tag;
