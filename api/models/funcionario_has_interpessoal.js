'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class funcionario_has_interpessoal extends Model 
  {
    static associate(models)
    {
      models.funcionario.belongsToMany(models.interpessoal,
        {
          through: funcionario_has_interpessoal,
          uniqueKey: 'funcionario_id'
        }
      )

      models.interpessoal.belongsToMany(models.funcionario,
        {
          through: funcionario_has_interpessoal,
          uniqueKey: 'interpessoal_id'
        }
      )
    }
  };

  funcionario_has_interpessoal.init(
    {
      nivel: DataTypes.FLOAT
    },
    
    {
      sequelize,
      modelName: 'funcionario_has_interpessoal',
      freezeTableName: true,
      underscored: true
    }
  );

  return funcionario_has_interpessoal;
};