'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario', {
      id: 
      {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      email: 
      {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(70)
      },

      senha_hash: 
      {
        allowNull: false,
        type: Sequelize.STRING
      },

      nv_autorizacao: 
      {
        allowNull: false,
        type: Sequelize.ENUM('admin','usuario')
      },

      funcionario_id: 
      {
        unique: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario');
  }
};