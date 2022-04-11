'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
  class funcionario_has_proficiencia extends Model 
  {
    static associate(models) 
    {
      models.funcionario.belongsToMany(models.proficiencia,
        {
          through: funcionario_has_proficiencia,
          foreignKey: 'funcionario_id'
        }
      )

      models.proficiencia.belongsToMany(models.funcionario,
        {
          through: funcionario_has_proficiencia,
          foreignKey: 'proficiencia_id'
        }
      )
    }
  };

  funcionario_has_proficiencia.init(
    {
      nivel: DataTypes.FLOAT,
      escrita: DataTypes.FLOAT,
      refactor: DataTypes.FLOAT,
      reuse: DataTypes.FLOAT,
      problema: DataTypes.FLOAT
    }, {
      sequelize,
      modelName: 'funcionario_has_proficiencia',
      freezeTableName: true,
      underscored: true
    }
  );

  return funcionario_has_proficiencia;
};