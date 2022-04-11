'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class projeto extends Model 
  {
    static associate(models) {}
  };
  projeto.init(
    {
      gestor: DataTypes.INTEGER,
      data_inicio: DataTypes.DATE,
      data_entrega: DataTypes.DATE,
      qtdd_horas: DataTypes.FLOAT,
      ativo: DataTypes.BOOLEAN
    },
    
    {
      sequelize,
      modelName: 'projeto',
      freezeTableName: true,
      underscored: true
    }
  );

  return projeto;
};