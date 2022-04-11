const { Router } = require('express')
const ControllerExperiencia = require('../controllers/ControllerExperiencia')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/exp', AuthMidleware, ControllerExperiencia.GetAll)
router.get('/exp/:id',AuthMidleware,  ControllerExperiencia.GetByFuncId)
router.post('/exp/add/:id', AuthMidleware, ControllerExperiencia.CreateNew)
router.post('/exp/up/:id',AuthMidleware,  ControllerExperiencia.Update)
router.get('/exp/del/:id', AuthMidleware, ControllerExperiencia.Delete)

module.exports = router