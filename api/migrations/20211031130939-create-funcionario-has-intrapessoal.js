'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario_has_intrapessoal', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },

      nivel: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      funcionario_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'funcionario', key: 'id'}
      },

      intrapessoal_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'intrapessoal', key: 'id'}
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
    await queryInterface.dropTable('funcionario_has_intrapessoal');
  }
};