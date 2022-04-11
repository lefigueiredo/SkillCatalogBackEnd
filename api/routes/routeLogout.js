const { Router } = require('express')
const ControllerLogout = require('../controllers/ControllerLogout')

const router = Router()

router.post('/logout',  ControllerLogout.Index)

module.exports = router