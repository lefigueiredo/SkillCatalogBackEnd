const { Router } = require('express')
const ControllerFormacao = require('../controllers/ControllerFormacao')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/formas', AuthMidleware, ControllerFormacao.GetAll)
router.get('/forma/:id', AuthMidleware, ControllerFormacao.GetByFuncId)
router.post('/forma/add/:id', AuthMidleware, ControllerFormacao.CreateNew)
router.post('/forma/up/:id', AuthMidleware, ControllerFormacao.Update)
router.get('/forma/del/:id', AuthMidleware, ControllerFormacao.Delete)
router.get('/funchasfor/del/:id', AuthMidleware, ControllerFormacao.FuncDeleteFormacao)

module.exports = router