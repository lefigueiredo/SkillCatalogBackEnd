'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class funcionario_has_intrapessoal extends Model 
  {
    static associate(models) {
      models.funcionario.belongsToMany(models.intrapessoal,
        {
          through: funcionario_has_intrapessoal,
          uniqueKey: 'funcionario_id'
        }
      )

      models.intrapessoal.belongsToMany(models.funcionario,
        {
          through: funcionario_has_intrapessoal,
          uniqueKey: 'intrapessoal_id'
        }
      )
    }
  };

  funcionario_has_intrapessoal.init(
    {
      nivel: DataTypes.FLOAT
    },

    {
      sequelize,
      modelName: 'funcionario_has_intrapessoal',
      freezeTableName: true,
      underscored: true
    }
  );

  return funcionario_has_intrapessoal;
};