const { success } = require('../utils/apiResponse')

class PrototypeController {
  static async me(req, res) {
    return success(res, 200, 'Dados do usuário autenticado.', {
      id: req.usuarioId,
      email: req.usuarioEmail,
      departamento: req.usuarioDepartamento,
      roles: req.usuarioRoles,
      permissions: req.usuarioPermissoes
    })
  }

  static async adminArea(req, res) {
    return success(res, 200, 'Acesso permitido à área AdmMaster.', {
      area: 'admin',
      message: 'Esta rota demonstra RBAC com role AdmMaster.'
    })
  }

  static async userArea(req, res) {
    return success(res, 200, 'Acesso permitido à área autenticada do colaborador.', {
      area: 'user',
      message: 'Esta rota demonstra acesso autenticado para UserFinal.'
    })
  }
}

module.exports = PrototypeController
