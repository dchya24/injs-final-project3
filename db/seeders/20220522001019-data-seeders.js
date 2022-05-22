'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Category', [
      { 
        type: "food",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        type: "drink",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "junkfood",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert("Product", [
      {
        CategoryId: 1,
        title: "Fried Rice",
        price: 6500,
        stock: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        title: "Noodle Soup",
        price: 6000,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 3,
        title: "Hamburger",
        price: 15000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        title: "Ice tea",
        price: 4000,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 3,
        title: "Orange juice",
        price: 4500,
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
