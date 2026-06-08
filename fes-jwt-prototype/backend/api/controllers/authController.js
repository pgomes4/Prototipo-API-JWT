const AuthService = require('../services/authService')
const { success, error } = require('../utils/apiResponse')

const authService = new AuthService()

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body

    try {
      const data = await authService.login({ email, password  })
      return success(res, 200, 'Login realizado com sucesso.', data)
    } catch (err) {
      return error(res, err.status || 401, err.message, err.code || 'AUTH_INVALID_CREDENTIALS')
    }
  }

  static async refresh(req, res) {
    const { refreshToken } = req.body

    try {
      const data = await authService.refresh(refreshToken)
      return success(res, 200, 'Access token renovado com sucesso.', data)
    } catch (err) {
      return error(res, err.status || 401, err.message, err.code || 'AUTH_REFRESH_TOKEN_INVALID')
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.body
    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
    try {
      const data = await authService.logout(refreshToken, accessToken)
      return success(res, 200, 'Logout realizado com sucesso.', data)
    } catch (err) {
      return error(res, 400, err.message, 'AUTH_LOGOUT_ERROR')
    }
  }
}

module.exports = AuthController
