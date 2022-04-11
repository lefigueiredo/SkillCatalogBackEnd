const database = require('../models')
const sgMail = require('@sendgrid/mail')
const sendEmail = require ('../config/sendEmail.js')
const bcrypt = require('bcrypt');
const generatePsw = require ('../config/generatePsw.js')


class ControllerUsuario
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                    u.id AS userarioId, f.nome AS funcNome, f.cargo AS funcCargo, f.`time` AS funcTime, u.email AS usuarioEmail, u.nv_autorizacao AS usuarioNv \
                FROM \
                    usuario u \
                INNER JOIN \
                    funcionario f ON f.id = u.funcionario_id \
                WHERE \
                    f.deleted is false',

                {
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            return res.status(200).json(all)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }
    
    static async GetById(req, res)
    {
        const {id} = req.params

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(user)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetByEmail(req, res)
    {
        const {email} = req.params

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {email: email}
                }
            )

            return res.status(200).json(user)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }       

    static async AddNewUser(req, res)
    {
        const user = req.body

        try
        {
            const newFunc = await database.funcionario.create(
                {
                    nome: user.userName,
                    cargo: user.userOccupation,
                    time: user.userTeam,
                    horas: 0,
                    ingresso: Date.now(),
                    deleted: false
                }
            )

            const newFuncData = await database.funcionario.findOne(
                {
                    where : 
                    {
                        nome: user.userName,
                        cargo: user.userOccupation,
                        time: user.userTeam,
                        deleted: false,
                        horas: 0
                    }
                }
            )

            const senha = generatePsw(8)

            const newUser = await database.usuario.create(
                {
                    senha_hash: senha,
                    email: user.userEmail,
                    nv_autorizacao: user.userType,
                    funcionario_id: newFuncData.id
                }
            )

            sendEmail(user.userEmail,'welcome', senha)

            return res.status(200).json(newUser)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Update(req, res)
    {
        const newInfo = req.body
        const {id} = req.params
        
        try
        {
            await database.sequelize.query(
                'UPDATE \
                    funcionario f \
                SET \
                    nome = :nome, \
                    cargo = :cargo, \
                    time = :time \
                WHERE \
                    f.id = ( \
                        SELECT \
                            u.funcionario_id \
                        FROM \
                            usuario u \
                        WHERE \
                            u.id = :id \
                    )', 
                {
                    replacements: {id, nome:newInfo.userName, cargo:newInfo.userOccupation, time:newInfo.userTeam},
                    type: database.sequelize.QueryTypes.UPDATE
                }                               
            ); 

            await database.sequelize.query(
                'UPDATE \
                    usuario u \
                SET \
                    email = :email, \
                    nv_autorizacao = :nivel \
                WHERE \
                    u.id = :id', 
                {
                    replacements: {id, email:newInfo.userEmail, nivel:newInfo.userType},
                    type: database.sequelize.QueryTypes.UPDATE
                }                               
            );

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Delete(req, res)
    {
        const {id} = req.params

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            await database.funcionario.update({deleted:true}, 
                {
                    where : {id: user.funcionario_id}
                }
            )

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async ResetPassword(req, res)
    {
        const {email} = req.params

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {email}
                }
            )

            const senha = generatePsw(8)

            await database.usuario.update(
                {
                    //generate a random password
                    senha_hash: senha
                },

                {
                    where : {email}
                }
            )
                
            sendEmail(user.email,'resetPws', senha)

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async ChangePassword(req, res)
    {
        const {id} = req.params
        const {oldPws, newPsw} = req.body

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            const validade = await bcrypt.compare(oldPws, user.senha_hash) 

            if (!validade) 
            {
                return res.status(400).json(
                    {
                        error: true,
                        msg: 'Senha inválida!'
                    }
                ) 
            }

            await database.usuario.update(
                {
                    senha_hash: newPsw
                },

                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    
}

module.exports = ControllerUsuario

