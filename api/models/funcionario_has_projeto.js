'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class funcionario_has_projeto extends Model 
  {
    static associate(models) 
    {
      models.funcionario.belongsToMany(models.projeto,
        {
          through: funcionario_has_projeto,
          uniqueKey: 'funcionario_id'
        }
      )

      models.projeto.belongsToMany(models.funcionario,
        {
          through: funcionario_has_projeto,
          uniqueKey: 'projeto_id'
        }
      )
    }
  };
  
  funcionario_has_projeto.init(
    {
      cargo: DataTypes.STRING(70)
    },
    
    {
      sequelize,
      modelName: 'funcionario_has_projeto',
      freezeTableName: true,
      underscored: true
    }
  );

  return funcionario_has_projeto;
};