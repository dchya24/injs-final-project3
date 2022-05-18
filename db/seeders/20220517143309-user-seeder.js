'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */    

    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync("password", salt);

    await queryInterface.bulkInsert('User', [{
      full_name: 'John Doe',
      email: "test@test.com",
      role: "admin",
      password: hashPassword,
      gender: "male",
      balance: 500000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
