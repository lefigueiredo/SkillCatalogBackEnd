'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => 
{
  class usuario extends Model 
  {   
    static associate(models) {
      usuario.belongsTo(models.funcionario, {foreignKey: 'funcionario_id'})
    }
  };

  var oldPsw = "";

  usuario.init(
    {
      email: DataTypes.STRING(70),      
      nv_autorizacao: DataTypes.ENUM('admin','usuario'),
      senha_hash: 
      {
        type: DataTypes.STRING,
        set(val)
        {
          oldPsw = val;
          const hash = bcrypt.hashSync(val, 10);
          this.setDataValue('senha_hash', hash);
        }        
      } 
    }, 

    {
      sequelize,
      modelName: 'usuario',
      freezeTableName: true,
      underscored: true,
      validate:
      {
        isLongEnough: function () 
        {
          if (oldPsw.length < 7) 
          {
            throw new Error("Por favor, escolha uma senha maior!")
          }  
        }
      }, 
    }
  );
  
  return usuario;
};