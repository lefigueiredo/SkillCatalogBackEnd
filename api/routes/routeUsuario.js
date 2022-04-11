const { Router } = require('express')
const ControllerUsuario = require('../controllers/ControllerUsuario')
const passport = require('passport')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.get('/usuario', AuthMidleware, ControllerUsuario.GetAll)
router.post('/usuario/up/:id', AuthMidleware, ControllerUsuario.Update)
router.get('/usuario/:email', AuthMidleware, ControllerUsuario.GetByEmail)
router.get('/usuario/:id', AuthMidleware, ControllerUsuario.GetById)
router.post('/usuario/add', AuthMidleware, ControllerUsuario.AddNewUser)
router.get('/usuario/del/:id', AuthMidleware, ControllerUsuario.Delete)
router.get('/reset/:email', ControllerUsuario.ResetPassword)
router.post('/change/:id', AuthMidleware, ControllerUsuario.ChangePassword)


module.exports = router