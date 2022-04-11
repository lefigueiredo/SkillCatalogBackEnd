'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proficiencia', {
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
        type: Sequelize.STRING,
        unique: true
      },

      tipo: 
      {
        allowNull: false,
        type: Sequelize.ENUM('Linguagem', 'Ferramenta', 'SO')
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
    await queryInterface.dropTable('proficiencia');
  }
};