const auth = require('./authRoute')
const prototype = require('./prototypeRoute')
const usuario = require('./usuariosRoute')
const role = require('./role')
const permissao = require('./permissao')
const seguranca = require('./seguranca')

module.exports = app => {
  app.use(
    auth,
    prototype,
    usuario,
    role,
    permissao,
    seguranca
  )
}
