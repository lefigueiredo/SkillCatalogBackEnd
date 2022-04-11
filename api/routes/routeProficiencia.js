const { Router } = require('express')
const ControllerProficiencia = require('../controllers/ControllerProficiencia')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/prof', AuthMidleware, ControllerProficiencia.GetAll)
router.get('/prof/:id', AuthMidleware, ControllerProficiencia.GetById)
router.post('/prof/new', AuthMidleware, ControllerProficiencia.CreateNew)
router.post('/funchasprof/add/:id', AuthMidleware, ControllerProficiencia.FuncAddProficiencia)
router.get('/funchasprof/:id', AuthMidleware, ControllerProficiencia.GetFuncAllProficiencia)
router.get('/funchasprof/all/:id', AuthMidleware, ControllerProficiencia.GetAllFuncWithProficienciaId)
router.get('/funchasprof/del/:id', AuthMidleware,  ControllerProficiencia.FuncDeleteProficiencia)
router.post('/prof/up/:id', AuthMidleware, ControllerProficiencia.Update)
router.get('/prof/all/avg/', AuthMidleware, ControllerProficiencia.AllAvg)

module.exports = router