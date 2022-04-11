const bodyParser = require('body-parser')
const cors = require('cors')

const passport = require('passport')
const funcionario = require('./routeFuncionario')
const usuario = require('./routeUsuario')
const login = require('./routeLogin')
const idioma = require('./routeIdioma')
const formacao = require('./routeFormacao')
const experiencia = require('./routeExperiencia')
const socail = require('./routeSocial')
const proficiencia = require('./routeProficiencia')
const imagem = require('./routeImagem')

module.exports = app => 
{
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(funcionario)
    app.use(usuario)    
    app.use(login)
    app.use(idioma)
    app.use(formacao)    
    app.use(experiencia)
    app.use(socail)
    app.use(proficiencia)
    app.use(imagem)
    app.use(cors())
}

