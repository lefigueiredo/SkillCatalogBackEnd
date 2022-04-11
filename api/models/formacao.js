'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class formacao extends Model 
  {
    static associate(models) 
    {
      formacao.belongsTo(models.funcionario, {foreignKey: 'funcionario_id'})
    }
  };

  formacao.init(
    {
      instituicao: DataTypes.STRING,
      diploma: DataTypes.STRING,
      area: DataTypes.STRING,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE
    },
    
    {
      sequelize,
      modelName: 'formacao',
      freezeTableName: true,
      underscored: true 
    }
  );

  return formacao;
};