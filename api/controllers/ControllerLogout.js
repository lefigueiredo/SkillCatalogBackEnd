const Usuario = require('./ControllerUsuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const database = require('../models')

class ControllerLogout
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
            return res.status(400).json(
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

        return res.status(200).json(
            {
                user: 
                {
                    email: userExist.email
                },

                token : jwt.sign(
                    {
                        id: userExist.id
                    },
                    config.secret,
                    {expiresIn: config.expireIn}
                )
            }
        )
    }
}

module.exports = ControllerLogin;