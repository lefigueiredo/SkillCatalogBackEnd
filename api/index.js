const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())

routes(app)

app.listen(3006, () => console.log('Servidor rodando na porta 3006'))

module.exports = app
