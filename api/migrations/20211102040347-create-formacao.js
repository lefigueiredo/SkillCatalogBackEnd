'use strict';
module.exports = 
{
  up: async (queryInterface, Sequelize) => 
  {
    await queryInterface.createTable('formacao', 
    {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      instituicao: 
      {
        type: Sequelize.STRING
      },

      diploma: 
      {
        type: Sequelize.STRING
      },

      area: 
      {
        type: Sequelize.STRING
      },

      data_inicio: 
      {
        type: Sequelize.DATE
      },

      data_fim: 
      {
        type: Sequelize.DATE
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