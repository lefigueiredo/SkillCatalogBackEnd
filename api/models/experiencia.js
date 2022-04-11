'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class experiencia extends Model 
  {
    static associate(models) 
    {
      experiencia.belongsTo(models.funcionario, {foreignKey: 'funcionario_id'})
    }
  };

  experiencia.init(
    {
      titulo: DataTypes.STRING,
      empresa: DataTypes.STRING,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE
    }, 
    
    {
      sequelize,
      modelName: 'experiencia',
      freezeTableName: true,
      underscored: true
    }
  );

  return experiencia;
};