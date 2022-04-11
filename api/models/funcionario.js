'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class funcionario extends Model 
  {
    static associate(models) {
      
    }
  };

  funcionario.init(
    {
      nome: DataTypes.STRING,
      horas: DataTypes.FLOAT,
      cargo: DataTypes.STRING(70),
      time: DataTypes.STRING(45),
      ingresso: DataTypes.DATE,
      projecao: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    }, 
    
    {
      sequelize,
      modelName: 'funcionario',
      freezeTableName: true,
      underscored: true   
    }
  );

  return funcionario;
};