'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      return queryInterface.addConstraint("Product", {
        fields: ["CategoryId"],
        type: "foreign key",
        name: "product_category_fk",
        references: {
          table: "Category",
          field: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      })
    })
    .catch(e => console.log(e))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};