const database = require('../models')

class ControllerFormacao
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.formacao.findAll()

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
            const all = await database.sequelize.query(
                'SELECT \
                f.instituicao, f.diploma, f.area, f.id, DATE(f.data_inicio) AS data_inicio, DATE(f.data_fim) AS data_fim, YEAR(f.data_inicio) as inicio, (\
                    CASE WHEN f.data_fim < CURDATE() THEN YEAR(f.data_fim) \
                    ELSE \'Cursando\' END \
                    ) as fim  \
                FROM \
                    formacao f \
                INNER JOIN \
                    funcionario fu ON fu.id = f.funcionario_id \
                INNER JOIN \
                    usuario u ON u.funcionario_id = f.funcionario_id \
                WHERE \
                    u.id = :id \
                ORDER BY \
                    data_fim DESC',
                {
                    replacements: {id},
                    type: database.sequelize.QueryTypes.SELECT
                }
            ); 

            return res.status(200).json(all)

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
            const userData = await database.usuario.findOne(
                {
                    where : 
                    {
                        id: id
                    }
                }
            )

            const newForma = await database.formacao.create(
                {
                    funcionario_id: userData.funcionario_id,
                    instituicao: forma.instituicao,
                    diploma: forma.diploma,
                    area: forma.area,
                    data_inicio: forma.data_inicio,
                    data_fim: forma.data_fim
                }
            )

            return res.status(200).json(newForma)

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
            await database.formacao.update(newInfo, 
                {
                    where : {id}
                }
            )

            const formaUpdated = await database.formacao.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(formaUpdated)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Delete(req, res)
    {
        const {id} = req.params
        try
        {
            await database.formacao.destroy(
                {
                    where : {id}
                }
            )

            return res.status(200).json({mensagem: `id ${id} deletado`})

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async FuncDeleteFormacao(req, res)
    {
        const {id} = req.params
        
        try
        {
            await database.formacao.destroy(
                { where : { id } }
            )            

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    } 
}

module.exports = ControllerFormacao

