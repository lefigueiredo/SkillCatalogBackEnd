const { Router } = require('express')
const ControllerLogin = require('../controllers/ControllerLogin')

const router = Router()

router.post('/login',  ControllerLogin.Index)

module.exports = router