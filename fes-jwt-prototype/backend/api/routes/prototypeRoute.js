const { Router } = require('express')
const autenticado = require('../middleware/autenticado')
const roles = require('../middleware/roles')
const PrototypeController = require('../controllers/prototypeController')

const router = Router()

router.get('/api/v1/me', autenticado, PrototypeController.me)
router.get('/api/v1/admin-area', autenticado, roles(['AdmMaster']), PrototypeController.adminArea)
router.get('/api/v1/user-area', autenticado, roles(['AdmMaster', 'UserFinal']), PrototypeController.userArea)

module.exports = router
