const Usuario = require('./ControllerUsuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const database = require('../models')

class ControllerLogin
{
    static async Index(req, res)
    {
        const { email, senha_hash } = req.body;

        const userExist = await database.usuario.findOne(
            {
                where : {email}
            }
        )        

        if (!userExist)
        {
            return res.status(401).json(
                {
                    error: true,
                    message: 'Usuário não encontrado!'
                }
            )
        }

        const validade = await bcrypt.compare(senha_hash, userExist.senha_hash)        
            
        if (!validade) 
        {
            return res.status(400).json(
                {
                    error: true,
                    message: 'Usuário ou senha inválidos!'
                }
            ) 
        }

        const deleted = await database.funcionario.findOne(
            {
                where : {id: userExist.funcionario_id}
            }
        )  
        
        if (deleted.deleted == true)
        {
            return res.status(401).json(
                {
                    error: true,
                    message: 'Esse Funcionário foi desligado!'
                }
            )
        }

        const userNameObj = await database.funcionario.findOne(
            {
                where : {id: userExist.funcionario_id}
            }
        )

        return res.status(200).json(
            {
                user: 
                {
                    email: userExist.id,
                    id: userExist.id,
                    nv: userExist.nv_autorizacao,
                    occu: userNameObj.cargo,
                    nome: userNameObj.nome
                },

                token : jwt.sign(
                    {
                        name: userNameObj.nome,
                        id: userExist.id,
                        nv: userExist.nv_autorizacao,
                        occu: userNameObj.cargo
                    },
                    
                    config.secret,
                    {expiresIn: config.expireIn}
                )
            }
        )
    }
}

module.exports = ControllerLogin;