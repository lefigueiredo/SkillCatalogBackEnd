const database = require('../models')

class ControllerProficiencia 
{
    static async GetAll(req, res)
    {
        try
        {
            const all = await database.proficiencia.findAll()
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
            const prof = await database.proficiencia.findOne(
                {
                    where : {id: Number(id)}
                }
            )

            return res.status(200).json(prof)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async CreateNew(req, res)
    {
        const prof = req.body

        try
        {
            const newProf = await database.proficiencia.create(prof)

            return res.status(200).json(newProf)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }    

    static async FuncAddProficiencia(req, res)
    {
        const {id} = req.params
        const prof = req.body

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
            
            if (await database.funcionario_has_proficiencia.findOne(
                {
                    where : 
                    {
                        funcionario_id: userData.funcionario_id,
                        proficiencia_id: prof.proficiencia
                    }
                }
            ))
            {
                return res.status(403).json(
                    {
                        msg: "Proficiência já cadastrada!"
                    }
                )
            }
            
            const nivel = getAverage(
                prof.escrita, 
                prof.refactor, 
                prof.reuse,
                prof.problema
            )

            const newProf = await database.funcionario_has_proficiencia.create(
                {
                    nivel: nivel,
                    refactor: prof.refactor,
                    escrita: prof.escrita,
                    problema: prof.problema,
                    reuse: prof.reuse,
                    funcionario_id: userData.funcionario_id,
                    proficiencia_id: prof.proficiencia
                }
            )

            return res.status(200).json(newProf)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }     

    static async GetFuncAllProficiencia(req, res)
    {     
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                fhp.nivel, p.nome, fhp.escrita, fhp.reuse, fhp.problema, fhp.refactor, fhp.id  \
                FROM \
                    funcionario_has_proficiencia fhp  \
                INNER JOIN \
                    proficiencia p ON p.id = fhp.proficiencia_id   \
                INNER JOIN \
                    funcionario f ON f.id = fhp.funcionario_id   \
                INNER JOIN \
                    usuario u ON f.id = u.funcionario_id \
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

    static async GetAllFuncWithProficienciaId(req, res)
    {     
        const {id} = req.params

        try
        {
            const all = await database.sequelize.query(
                'SELECT \
                    fhp.nivel, p.nome, fu.nome as func_name \
                FROM \
                    funcionario_has_proficiencia fhp \
                INNER JOIN \
                    proficiencia p ON p.id = fhp.proficiencia_id \
                INNER JOIN \
                    funcionario fu ON fu.id = fhp.funcionario_id \
                WHERE \
                    p.id = :id',
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
    
    static async FuncDeleteProficiencia(req, res)
    {
        const {id} = req.params
        
        try
        {
            await database.funcionario_has_proficiencia.destroy(
                { where : { id } }
            )            

            return res.status(200).json()

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
            await database.funcionario_has_proficiencia.update(newInfo, 
                {
                    where : {id: Number(id)}
                }
            )

            const profUpdated = await database.sequelize.query(
                'SELECT \
                    fhp.* \
                FROM \
                    funcionario_has_proficiencia fhp \
                WHERE \
                    fhp.id = :id',
                {
                    replacements: {id},
                    type: database.sequelize.QueryTypes.SELECT
                } 
            )        

            const nivel = getAverage(
                profUpdated[0].escrita, 
                profUpdated[0].refactor, 
                profUpdated[0].reuse,
                profUpdated[0].problema
            )

            await database.funcionario_has_proficiencia.update({nivel: nivel},
                {
                    where : {id}
                }
            )

            const funcProfi = await database.funcionario_has_proficiencia.findOne(
                {
                    where : {id}
                }
            )

            return res.status(200).json(profUpdated)

        } catch (error) {

            return res.status(500).json(error.message)
        }        
    }

    static async AllAvg(req, res)
    {       
        const {id} = req.params

        try
        {
            var avg = await database.sequelize.query(
                'SELECT\
                    p.nome AS proficiencia, p.id as id,\
                    AVG(fhp.escrita) as media_escrita,\
                    AVG(fhp.refactor) as media_refactor,\
                    AVG(fhp.reuse) as media_reuse,\
                    AVG(fhp.problema) as media_problema\
                FROM funcionario_has_proficiencia fhp\
                    INNER JOIN proficiencia p\
                    ON fhp.proficiencia_id = p.id\
                GROUP BY p.nome', 
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

module.exports = ControllerProficiencia

