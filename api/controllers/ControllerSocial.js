const database = require('../models')

class ControllerSocial
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.social.findAll()

            return res.status(200).json(all)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetByFuncId(req, res)
    {
        const {id} = req.params

        try
        {
            const social = await database.social.findAll(
                {
                    where : {funcionario_id: Number(id)}
                }
            )

            return res.status(200).json(social)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async CreateNew(req, res)
    {
        const {id} = req.params
        const forma = req.body

        try
        {
            const newSocial = await database.social.create(
                {
                    funcionario_id: id,
                    nome: forma.nome,
                    link: forma.link
                }
            )

            return res.status(200).json(newSocial)

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
            await database.social.update(newInfo, 
                {
                    where : {id: Number(id)}
                }
            )

            const socialUpdated = await database.social.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(socialUpdated)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Delete(req, res)
    {
        const {id} = req.params
        try
        {
            await database.social.destroy(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json({mensagem: `id ${id} deletado`})

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }
}

module.exports = ControllerSocial

