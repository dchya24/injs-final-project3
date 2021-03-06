'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey: "CategoryId",
        as: "products"
      })
    }
  }
  Category.init({
    type: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    sold_product_amount: { 
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: "Category"
  });
  return Category;
};