const express = require('express')
const routes = require('./routes')
const env = require('./config/env')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', env.frontendOrigin)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  return next()
})

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'FictionalEnterpriseSolutions API online', data: { status: 'ok' } })
})

routes(app)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
    error: { code: 'ROUTE_NOT_FOUND', details: [] }
  })
})

app.listen(env.port, () => {
  console.log(`FictionalEnterpriseSolutions backend rodando em https://localhost:${env.port} ou http://localhost:${env.port}`)
})

module.exports = app
