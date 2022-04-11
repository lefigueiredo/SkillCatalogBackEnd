'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class idioma extends Model 
  {
    static associate(models) 
    {
      
    }
  };

  idioma.init(
    {
      nome: DataTypes.STRING(40)
    },
    
    {
      sequelize,
      modelName: 'idioma',
      freezeTableName: true,
      underscored: true
    }
  );

  return idioma;
};