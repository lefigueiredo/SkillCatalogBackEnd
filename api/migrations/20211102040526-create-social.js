'use strict';
module.exports = 
{
  up: async (queryInterface, Sequelize) => 
  {
    await queryInterface.createTable('social', 
    {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nome: 
      {
        type: Sequelize.STRING
      },

      link: 
      {
        type: Sequelize.STRING
      },

      funcionario_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'funcionario', key: 'id'}
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

  down: async (queryInterface, Sequelize) => {}
};