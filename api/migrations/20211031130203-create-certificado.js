'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('certificado', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },

      titulo: 
      {
        allowNull: false,
        type: Sequelize.STRING
      },

      descricao: 
      {
        allowNull: false,
        type: Sequelize.STRING
      },

      data:
      {
        allowNull: false,
        type: Sequelize.DATE
      },

      funcionario_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'funcionario', key: 'id'}
      },

      imagem_id: 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'imagem', key: 'id'}
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
    await queryInterface.dropTable('certificado');
  }
};