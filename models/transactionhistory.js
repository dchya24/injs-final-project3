'use strict';
const {
  Model
} = require('sequelize');
const helper = require("../helpers/helper")
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        as: 'Product'
      });

      this.belongsTo(models.User, {
        as: 'User'
      });
    }
  }
  TransactionHistory.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity:  { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    total_price:  { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
    tableName: 'TransactionHistory'
  });
  return TransactionHistory;
};