const { Router } = require('express')
const ControllerIdioma = require('../controllers/ControllerIdioma')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/idioma', AuthMidleware, ControllerIdioma.GetAll)
router.get('/idioma/:id', AuthMidleware, ControllerIdioma.GetById)
router.post('/idioma/new', AuthMidleware, ControllerIdioma.CreateNew)
router.get('/idioma/d/:id', AuthMidleware, ControllerIdioma.Delete)
router.post('/funchasidi', AuthMidleware, ControllerIdioma.FuncAddIdioma)
router.get('/funchasidi/:id', AuthMidleware, ControllerIdioma.GetFuncAllIdioma)
router.get('/funchasidi/all/:id', AuthMidleware, ControllerIdioma.GetAllFuncWithIdiomaId)
router.post('/funchasidi/updt/:id', AuthMidleware, ControllerIdioma.FuncUpdateIdioma)
router.post('/funchasidi/del/:id', AuthMidleware, ControllerIdioma.FuncDeleteIdioma)
router.get('/idi/all/avg/', AuthMidleware, ControllerIdioma.AllAvg)

module.exports = router