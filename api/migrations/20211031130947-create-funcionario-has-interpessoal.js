'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario_has_interpessoal', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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

      interpessoal_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'interpessoal', key: 'id'}
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
    await queryInterface.dropTable('funcionario_has_interpessoal');
  }
};