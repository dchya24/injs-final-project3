'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      return queryInterface.addConstraint("TransactionHistory", {
        fields: ["UserId"],
        type: "foreign key",
        name: "transaction_hitory_user_fk",
        references: {
          table: "User",
          field: "id"
        }
      })
    }).then(() => {
      return queryInterface.addConstraint("TransactionHistory", {
        fields: ["ProductId"],
        type: "foreign key",
        name: "transaction_hitory_prodct_fk",
        references: {
          table: "Product",
          field: "id"
        }
      })
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionHistory');
  }
};