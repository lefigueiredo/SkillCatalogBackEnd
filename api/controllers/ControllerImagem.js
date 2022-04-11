const database = require('../models')
const { QueryTypes } = require('sequelize');
const fs = require('fs');

class ControllerImagem
{
    static async AddImagem(req, res)
    {
        const {id} = req.params
        const {tipo} = req.params
        const croppedImg64 = req.body['base']
        let buff = Buffer.from(croppedImg64,"base64");

        try 
        {
            const base64 = await database.imagem.findOne(
                {
                    where : {user_id: Number(id), type: tipo}
                }
            )

            if (!base64)
            {
                const newImg = await database.imagem.create(
                    {
                        file: buff,
                        user_id: Number(id),
                        type: tipo
                    }
                )                 
            }

            const newImg = await database.imagem.update(
                {
                    file: buff,
                    user_id: Number(id),
                    type: tipo
                },

                {
                    where : {user_id: Number(id), type: tipo}
                }
            )            

            return res.status(200).json(newImg)

        } catch (error) {

            return res.status(500).json(error.message)
        }           
    }

    static async GetByUserId(req, res)
    {
        const {id} = req.params
        const {tipo} = req.params

        try
        {
            const base64 = await database.imagem.findOne(
                {
                    where : {user_id: Number(id), type: tipo}
                }
            )

            if(base64)
            {                
                let base64data = Buffer.from(base64['file']).toString('base64'); 
                return res.status(200).json(base64data)    
            }
           
            return res.status(200).json({dado:'vazio'})            

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }  
}

module.exports = ControllerImagem

