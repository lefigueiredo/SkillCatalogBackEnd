'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario_has_projeto', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cargo: 
      {
        allowNull: false,
        type: Sequelize.STRING(70)
      },

      funcionario_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'funcionario', key: 'id'}
      },

      projeto_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'projeto', key: 'id'}
      },

      createdAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('funcionario_has_projeto');
  }
};