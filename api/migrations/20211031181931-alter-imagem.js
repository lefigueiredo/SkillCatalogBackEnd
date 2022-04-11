'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'imagem',
      'user_id',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {}
};