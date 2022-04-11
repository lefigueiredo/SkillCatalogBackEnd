'use strict';
const { Model } = require('sequelize');
const funcionario = require('./funcionario');
const imagem = require('./imagem');

module.exports = (sequelize, DataTypes) => 
{
  class certificado extends Model 
  {
    static associate(models) 
    {
      certificado.belongsTo(models.funcionario, {foreignKey: 'funcionario_id'})
      certificado.belongsTo(models.imagem, {foreignKey: 'imagem_id'})
    }
  };

  certificado.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      data: DataTypes.DATE
    }, 
    
    {
      sequelize,
      modelName: 'certificado',
      freezeTableName: true,
      underscored: true
    }
  );

  return certificado;
};