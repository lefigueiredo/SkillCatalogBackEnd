'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class proficiencia extends Model 
  {
    static associate(models) {}
  };
  proficiencia.init(
    {
      nome: DataTypes.STRING,
      tipo: DataTypes.ENUM('Linguagem', 'Ferramenta', 'SO')
    },
    
    {
      sequelize,
      modelName: 'proficiencia',
      freezeTableName: true,
      underscored: true
    }
  );

  return proficiencia;
};