const { Router } = require('express')
const ControllerSocial = require('../controllers/ControllerSocial')

const router = Router()

router.get('/soc', ControllerSocial.GetAll)
router.get('/soc/:id', ControllerSocial.GetByFuncId)
router.post('/soc/add/:id', ControllerSocial.CreateNew)
router.post('/soc/up/:id', ControllerSocial.Update)
router.get('/soc/del/:id', ControllerSocial.Delete)

module.exports = router