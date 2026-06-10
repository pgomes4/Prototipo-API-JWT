const { Router } = require('express')
const LifecycleController = require('../controllers/lifecycleController')
const autenticado = require('../middleware/autenticado')
const roles = require('../middleware/roles')

const router = Router()

router.patch(
  '/api/v1/lifecycle/inativar-usuario',
  autenticado,
  roles(['AdmMaster']),
  LifecycleController.inativarUsuario
)

module.exports = router