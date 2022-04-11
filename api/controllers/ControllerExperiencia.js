const database = require('../models')

class ControllerExperiencia
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.experiencia.findAll()

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
            const exp = await database.experiencia.findAll(
                {
                    where : {funcionario_id: Number(id)}
                }
            )

            return res.status(200).json(exp)

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
            const newExp = await database.experiencia.create(
                {
                    funcionario_id: id,
                    titulo: forma.titulo,
                    empresa: forma.empresa,
                    data_inicio: forma.data_inicio,
                    data_fim: forma.data_fim
                }
            )

            return res.status(200).json(newExp)

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
            await database.experiencia.update(newInfo, 
                {
                    where : {id: Number(id)}
                }
            )

            const expUpdated = await database.experiencia.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(expUpdated)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Delete(req, res)
    {
        const {id} = req.params
        try
        {
            await database.experiencia.destroy(
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

module.exports = ControllerExperiencia

