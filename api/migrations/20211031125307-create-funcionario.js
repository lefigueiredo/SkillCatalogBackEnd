'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },

      nome: 
      {
        allowNull: false,
        type: Sequelize.STRING
      },

      horas: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      cargo: 
      {
        allowNull: false,
        type: Sequelize.STRING(70)
      },

      time: 
      {
        allowNull: false,
        type: Sequelize.STRING(45)
      },

      ingresso: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },

      projecao: 
      {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('funcionario');
  }
};