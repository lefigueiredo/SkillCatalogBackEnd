'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projeto', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },

      gestor: 
      {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      data_inicio: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },

      data_entrega: 
      {
        type: Sequelize.DATE
      },

      qtdd_horas: 
      {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      ativo: 
      {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('projeto');
  }
};