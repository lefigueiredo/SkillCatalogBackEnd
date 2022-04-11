const { Router } = require('express')
const ControllerImagem = require('../controllers/ControllerImagem')
const AuthMidleware = require('../config/AuthMidleware')

const router = Router()

router.post('/img/add/:id/:tipo', AuthMidleware, ControllerImagem.AddImagem)
router.get('/img/:id/:tipo', AuthMidleware, ControllerImagem.GetByUserId)

module.exports = router