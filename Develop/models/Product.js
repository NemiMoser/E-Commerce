// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 15,
      validate: {
        isDecimal: true
      }
    },
    product_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isAlphanumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'category_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Product',
  }
);

module.exports = Product;
