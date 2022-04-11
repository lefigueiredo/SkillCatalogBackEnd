const database = require('../models')
require('date-utils');

class ControllerFuncionario
{
    // Geral queries
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.funcionario.findAll()
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
            const funcio = await database.funcionario.findOne(
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
        const funcio = req.body

        try
        {
            const newFuncio = await database.funcionario.create(funcio)

            return res.status(200).json(newFuncio)

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
            await database.funcionario.update(newInfo, 
                {
                    where : {id: Number(id)}
                }
            )

            const funcioUpdated = await database.funcionario.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(funcioUpdated)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async Delete(req, res)
    {
        const {id} = req.params
        try
        {
            await database.funcionario.destroy(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json({mensagem: `id ${id} deletado`})

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }
    
    static async GetAllSearch(req, res)
    {
        try
        {
            const all = await database.sequelize.query(
               'SELECT * \
                FROM ( \
                    SELECT \
                        f.nome AS NomeFuncionario, \
                        f.cargo AS Cargo, \
                        f.time AS Time, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(i.nome) \
                            FROM \
                                funcionario_has_idioma fhi \
                            LEFT JOIN \
                                idioma i ON fhi.idioma_id = i.id \
                            WHERE \
                                fhi.funcionario_id = f.id \
                        ) AS Idiomas, \
                        ( \
                            SELECT \
                                u.id \
                            FROM \
                                usuario u \
                            WHERE \
                                u.funcionario_id = f.id \
                        ) AS Id, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(fhi.nivel) \
                            FROM \
                                funcionario_has_idioma fhi \
                            WHERE \
                                fhi.funcionario_id = f.id \
                        ) AS IdiomasNivel, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(fm.diploma, \' em \', fm.area) \
                            FROM \
                                formacao fm \
                            WHERE \
                                fm.funcionario_id = f.id \
                        ) AS Formacoes, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(YEAR(fm.data_fim)) \
                            FROM \
                                formacao fm \
                            WHERE \
                                fm.funcionario_id = f.id \
                        ) AS FormacoesInf, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(p.nome) \
                            FROM \
                                funcionario_has_proficiencia fhp  \
                            LEFT JOIN \
                                proficiencia p ON fhp.proficiencia_id = p.id \
                            WHERE \
                                f.id = fhp.funcionario_id \
                        ) AS Proficiencias, \
                        ( \
                            SELECT \
                                GROUP_CONCAT(fhp.nivel) \
                            FROM \
                                funcionario_has_proficiencia fhp  \
                            WHERE \
                                f.id = fhp.funcionario_id \
                        ) AS ProficienciasNivel \
                    FROM \
                        funcionario f  \
                    WHERE \
                        f.deleted is false\
                ) listafuncionarios \
                GROUP BY \
                    NomeFuncionario, Cargo, Time, Idiomas, Formacoes, Proficiencias, IdiomasNivel, FormacoesInf, ProficienciasNivel, Id',
                {
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            for (var i = 0; i < all.length; i++)
            {                
                all[i]['Informacoes'] = 
                [{
                    'Idiomas': all[i].Idiomas,
                    'Formacoes': all[i].Formacoes,
                    'Proficiencias': all[i].Proficiencias,
                    'IdiomasNivel': all[i].IdiomasNivel,
                    'FormacoesInf': all[i].FormacoesInf,
                    'ProficienciasNivel': all[i].ProficienciasNivel,
                    'Id': all[i].Id
                }]
            }

            return res.status(200).json(all)                        

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    // Main queries
    static async GetFuncTime(req, res)
    {
        const {id} = req.params

        try
        {
            const date = Date.today();

            const all = await database.sequelize.query(
                'SELECT DATEDIFF \
                    (:date, f.ingresso) AS tempo \
                FROM \
                    funcionario f \
                INNER JOIN \
                    usuario u ON u.funcionario_id = f.id\
                WHERE \
                    u.id = :id',
                {
                    replacements: {date, id},
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            if (all[0].tempo < 360)
            {
                return res.status(200).json({"time":"< 1 ano"})
            } 
            else if (all[0].tempo / 360 == 1)
            {
                return res.status(200).json({"time":"1 ano"})
            }
            else if (all[0].tempo / 360 < 2)
            {
                return res.status(200).json({"time":"1+ ano"})
            }
            else 
            {
                const time = parseInt(all[0].tempo / 360)
                return res.status(200).json({"time":time + "+ anos"}) 
            }

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetFuncProf(req, res)
    {
        const {id} = req.params

        try
        {
            const date = Date.today();

            const all = await database.sequelize.query(
                'SELECT \
                    COUNT(*) as conta \
                FROM \
                    funcionario_has_proficiencia fhp \
                INNER JOIN \
                    funcionario fu ON fu.id = fhp.funcionario_id \
                INNER JOIN \
                    usuario u ON u.funcionario_id = fhp.funcionario_id \
                WHERE \
                    u.id = :id',
                {
                    replacements: {id},
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            if (all[0].conta < 1) 
            {
                return res.status(200).json({"prof":"0"})
            } 
            else if (all[0].conta == 1)
            {
                return res.status(200).json({"prof":"1"})
            }
            else 
            {
                const prof = all[0].conta - 1
                return res.status(200).json({"prof":prof + "+"}) 
            } 

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetFuncFormacoes(req, res)
    {
        const {id} = req.params

        try
        {
            const date = Date.today();

            const all = await database.sequelize.query(
                'SELECT \
                    COUNT(*) as conta \
                FROM \
                    formacao fhp \
                INNER JOIN \
                    funcionario fu ON fu.id = fhp.funcionario_id \
                INNER JOIN \
                    usuario u ON u.funcionario_id = fhp.funcionario_id \
                WHERE \
                    u.id = :id',
                {
                    replacements: {id},
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            if (all[0].conta < 1) 
            {
                return res.status(200).json({"forma":"0"})
            } 
            else if (all[0].conta == 1)
            {
                return res.status(200).json({"forma":"1"})
            }
            else 
            {
                const prof = all[0].conta - 1
                return res.status(200).json({"forma":prof + "+"}) 
            } 

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetFuncExp(req, res)
    {
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                e.titulo, e.empresa, YEAR(e.data_inicio) AS data_inicio, YEAR(e.data_fim) AS data_fim \
                FROM \
                    experiencia e \
                INNER JOIN \
                    funcionario fu ON fu.id = e.funcionario_id \
                INNER JOIN \
                    usuario u ON u.funcionario_id = e.funcionario_id \
                WHERE \
                    u.id = :id \
                ORDER BY \
                    data_inicio DESC',
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

    static async GetFuncForm(req, res)
    {
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                f.instituicao, f.diploma, f.area, f.id, (\
                    CASE WHEN f.data_fim < CURDATE() THEN YEAR(f.data_fim) \
                    ELSE \'Cursando\' END \
                    ) as data_fim  \
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

    static async GetBarColor(req, res)
    {
        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                    data  \
                FROM \
                    shared s \
                WHERE \
                    tipo = "barColor"',
                {
                    type: database.sequelize.QueryTypes.SELECT
                }
            );  

            return res.status(200).json(all) 
            

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async GetFuncName(req, res)
    {
        const {id} = req.params

        try
        {
            const user = await database.usuario.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            const funcio = await database.funcionario.findOne(
                {
                    where : {id: user.funcionario_id},
                    attributes: ['cargo']
                }
            )
            
            return res.status(200).json(funcio.cargo)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }


    
}

module.exports = ControllerFuncionario

