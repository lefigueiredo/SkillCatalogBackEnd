const { Router } = require('express')
const ControllerFuncionario = require('../controllers/ControllerFuncionario')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/funcionario', AuthMidleware, ControllerFuncionario.GetAll)
router.get('/funcionario/:id', AuthMidleware, ControllerFuncionario.GetById)
router.post('/funcionario', AuthMidleware, ControllerFuncionario.CreateNew)
router.put('/funcionario/:id', AuthMidleware, ControllerFuncionario.Update)
router.delete('/funcionario/:id', AuthMidleware, ControllerFuncionario.Delete)
router.get('/func/time/:id', AuthMidleware, ControllerFuncionario.GetFuncTime)
router.get('/func/prof/:id', AuthMidleware, ControllerFuncionario.GetFuncProf)
router.get('/func/formaaa/:id', AuthMidleware, ControllerFuncionario.GetFuncFormacoes)
router.get('/func/exp/:id', AuthMidleware, ControllerFuncionario.GetFuncExp)
router.get('/func/forma/:id', AuthMidleware, ControllerFuncionario.GetFuncForm)
router.get('/main/bar-color', AuthMidleware, ControllerFuncionario.GetBarColor)
router.get('/pesq/all', AuthMidleware, ControllerFuncionario.GetAllSearch)
router.get('/func/name/', AuthMidleware, ControllerFuncionario.GetFuncName)

module.exports = router