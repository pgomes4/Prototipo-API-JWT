const { Router } = require('express')
const AuthController = require('../controllers/authController')
const autenticado = require('../middleware/autenticado')
const roles = require('../middleware/roles')

const router = Router()

router.post('/api/v1/auth/login', AuthController.login)
router.post('/api/v1/auth/refresh', AuthController.refresh)
router.post('/api/v1/auth/logout', AuthController.logout)

module.exports = router
