const lifecycleService = require('../services/lifecycleService')
const { success, error } = require('../utils/apiResponse')

class LifecycleController {
  static async inativarUsuario(req, res) {
    const { email } = req.body

    try {
      const data = await lifecycleService.inativarUsuarioPorEmail(email)

      return success(
        res,
        200,
        'Usuário inativado e tokens revogados com sucesso.',
        data
      )
    } catch (err) {
      return error(
        res,
        err.status || 400,
        err.message || 'Erro ao inativar o usuário.',
        err.code || 'USER_INACTIVATION_ERROR'
      )
    }
  }
}

module.exports = LifecycleController