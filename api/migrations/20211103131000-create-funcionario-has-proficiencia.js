'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario_has_proficiencia', {
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

      escrita: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      refactor: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      reuse: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      problema: 
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

      proficiencia_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'proficiencia', key: 'id'}
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

  down: async (queryInterface, Sequelize) => 
  {
    await queryInterface.dropTable('funcionario_has_proficiencia');
  }
};