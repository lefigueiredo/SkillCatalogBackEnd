const database = require('../models')
const { QueryTypes } = require('sequelize');

class ControllerIdioma
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.idioma.findAll()
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
            const funcio = await database.idioma.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(funcio)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async CreateNew(req, res)
    {
        //ver se ja existe e nao deixa add novo
        const idioma = req.body

        try
        {
            const newIdioma = await database.idioma.create(idioma)

            return res.status(200).json(newIdioma)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }    

    static async Delete(req, res)
    {
        const {id} = req.params
        try
        {
            await database.idioma.destroy(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json({mensagem: `id ${id} deletado`})

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async FuncAddIdioma(req, res)
    {
        const idioma = req.body
        try
        {
            const userData = await database.usuario.findOne(
                {
                    where : 
                    {
                        id: idioma.userId
                    }
                }
            )   
            
            if (await database.funcionario_has_idioma.findOne(
                {
                    where : 
                    {
                        funcionario_id: userData.funcionario_id,
                        idioma_id: idioma.idioma
                    }
                }
            ))
            {
                return res.status(403).json(
                    {
                        msg: "Idioma já cadastrado!"
                    }
                )
            }
            
            const nivel = getAverage(
                idioma.leitura, 
                idioma.escrita, 
                idioma.audicao,
                idioma.fala
            )

            const newIdioma = await database.funcionario_has_idioma.create(
                {
                    nivel: nivel,
                    leitura: idioma.leitura,
                    escrita: idioma.escrita,
                    audicao: idioma.audicao,
                    fala: idioma.fala,
                    funcionario_id: userData.funcionario_id,
                    idioma_id: idioma.idioma
                }
            )

            return res.status(200).json(newIdioma)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async FuncUpdateIdioma(req, res)
    {
        const idiToUpdate = req.body
        const {id} = req.params
        
        try
        {
            await database.sequelize.query(
                'UPDATE \
                    funcionario_has_idioma fhi \
                SET \
                    leitura = :leitura, \
                    escrita = :escrita, \
                    audicao = :audicao, \
                    fala = :fala \
                WHERE \
                    fhi.funcionario_id = ( \
                        SELECT \
                            f.id \
                        FROM \
                            usuario u \
                        INNER JOIN \
                            funcionario f ON f.id = u.funcionario_id \
                        WHERE \
                            u.id = :id \
                    ) \
                AND \
                    fhi.idioma_id = ( \
                        SELECT \
                            i.id \
                        FROM \
                            idioma i \
                        WHERE \
                            i.nome = :idioma)', 
                {
                    replacements: {id, idioma:idiToUpdate.idioma, leitura:idiToUpdate.leitura, escrita:idiToUpdate.escrita, audicao:idiToUpdate.audicao, fala:idiToUpdate.fala},
                    type: database.sequelize.QueryTypes.UPDATE
                }                               
            ); 

            var idioma = await database.sequelize.query(
                'SELECT \
                    fhi.* \
                FROM \
                    funcionario_has_idioma fhi 	\
                INNER JOIN \
                    usuario u ON u.funcionario_id = fhi.funcionario_id \
                WHERE \
                    u.id = :id \
                AND \
                    fhi.idioma_id = ( \
                        SELECT \
                            i.id \
                        FROM \
                            idioma i \
                        WHERE \
                            i.nome = :idioma)',
                {
                    replacements: {id:id, idioma:idiToUpdate.idioma},
                    type: database.sequelize.QueryTypes.SELECT
                } 
            )

            idioma = idioma[0]

            const nivel = getAverage(
                idioma.leitura, 
                idioma.escrita, 
                idioma.audicao,
                idioma.fala
            )

            await database.funcionario_has_idioma.update({nivel: nivel},
                {
                    where : {id: idioma.id}
                }
            )


            const funcIdioma = await database.funcionario_has_idioma.findOne(
                {
                    where : {id: Number(idioma.id)}
                }
            )

            return res.status(200).json(funcIdioma)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    } 

    static async FuncDeleteIdioma(req, res)
    {
        const idiToDelete = req.body
        const {id} = req.params
        
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

            const idiomaData = await database.idioma.findOne(
                {
                    where : 
                    {
                        nome: idiToDelete.idioma
                    }
                }
            )

            await database.funcionario_has_idioma.destroy(
                {
                    where : 
                    {
                        funcionario_id: userData.funcionario_id,
                        idioma_id: idiomaData.id
                    }
                }
            )            

            return res.status(200).json()

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    } 

    static async GetFuncAllIdioma(req, res)
    {     
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                    i.nome as nome, fhi.nivel as nivel, fhi.leitura, fhi.escrita, fhi.audicao, fhi.fala, "" as icon, fhi.id as id \
                FROM \
                    funcionario_has_idioma fhi \
                INNER JOIN \
                    idioma i ON i.id = fhi.idioma_id \
                INNER JOIN \
                    usuario u ON u.funcionario_id = fhi.funcionario_id \
                WHERE \
                    u.id = :id', 
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

    static async GetAllFuncWithIdiomaId(req, res)
    {     
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                    i.nome, fhi.nivel, fu.nome as func_nome\
                FROM \
                    funcionario_has_idioma fhi \
                INNER JOIN \
                    idioma i ON i.id = fhi.idioma_id \
                INNER JOIN \
                    funcionario fu ON fu.id = fhi.funcionario_id \
                WHERE \
                    i.id = :id',
                {
                    replacements: {id},
                    type: database.sequelize.QueryTypes.SELECT
                }
            );         

            return res.status(200).send(all)

        } catch (error) {

            return res.status(500).send(error.message)
        }        
    }  
    
    static async AllAvg(req, res)
    {       
        const {id} = req.params

        try
        {
            var avg = await database.sequelize.query(
                'SELECT \
                    i.nome AS idioma, i.id as id, \
                    AVG(fhi.leitura) as media_leitura, \
                    AVG(fhi.escrita) as media_escrita, \
                    AVG(fhi.audicao) as media_audicao, \
                    AVG(fhi.fala) as media_fala \
                FROM funcionario_has_idioma fhi  \
                    INNER JOIN idioma i \
                    ON fhi.idioma_id = i.id  \
                GROUP BY i.nome', 
                {                    
                    type: database.sequelize.QueryTypes.SELECT
                }                               
            ); 

            return res.status(200).json(avg)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    } 
}

function getAverage(v1, v2, v3, v4)
    {
        return (parseFloat(v1)+parseFloat(v2)+parseFloat(v3)+parseFloat(v4))*100/4;
    }

module.exports = ControllerIdioma

