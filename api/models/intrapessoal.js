'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class intrapessoal extends Model 
  {
    static associate(models) {}
  };

  intrapessoal.init(
    {
      nome: DataTypes.STRING
    },
    
    {
      sequelize,
      modelName: 'intrapessoal',
      freezeTableName: true,
      underscored: true
    }
  );

  return intrapessoal;
};