'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class funcionario_has_idioma extends Model 
  {    
    static associate(models) {
      models.funcionario.belongsToMany(models.idioma,
        {
          through: funcionario_has_idioma,
          foreignKey: 'funcionario_id'
        }
      )

      models.idioma.belongsToMany(models.funcionario,
        {
          through: funcionario_has_idioma,
          foreignKey: 'idioma_id'
        }
      )
    }
  };

  funcionario_has_idioma.init(
    {
      nivel: DataTypes.FLOAT,
      leitura: DataTypes.FLOAT,
      escrita: DataTypes.FLOAT,
      audicao: DataTypes.FLOAT,
      fala: DataTypes.FLOAT
    }, 
    
    {
      sequelize,
      modelName: 'funcionario_has_idioma',
      freezeTableName: true,
      underscored: true
    }
  );
  
  return funcionario_has_idioma;
};