'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class social extends Model 
  {
    static associate(models) 
    {
      social.belongsTo(models.funcionario, {foreignKey: 'funcionario_id'})
    }
  };

  social.init(
    {
      nome: DataTypes.STRING,
      link: DataTypes.STRING
    },
    
    {
      sequelize,
      modelName: 'social',
      freezeTableName: true,
      underscored: true 
    }
  );

  return social;
};