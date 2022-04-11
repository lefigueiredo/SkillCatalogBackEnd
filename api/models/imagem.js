'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
  class imagem extends Model 
  {
    static associate(models) {}
  };

  imagem.init(
    {
      user_id: DataTypes.INTEGER,      
      type: DataTypes.ENUM('capa','perfil','certificado'),
      file: DataTypes.BLOB('long')
    }, 
    
    {
      sequelize,
      modelName: 'imagem',
      freezeTableName: true,
      underscored: true
    }
  );

  return imagem;
};