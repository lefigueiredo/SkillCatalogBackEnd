'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class interpessoal extends Model 
  {
    static associate(models) {}
  };
  interpessoal.init(
    {
      nome: DataTypes.STRING
    },
    
    {
      sequelize,
      modelName: 'interpessoal',
      freezeTableName: true,
      underscored: true
    }
  );

  return interpessoal;
};