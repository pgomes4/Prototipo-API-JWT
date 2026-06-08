const permissoesRoles = (listaPermissoes = []) => {
  return async (req, res, next) => {
    const permissoesUsuario = req.usuarioPermissoes || []
    const possuiPermissao = permissoesUsuario.some((permissao) => listaPermissoes.includes(permissao))

    if (!possuiPermissao) {
      return res.status(403).json({
        success: false,
        message: 'Usuário autenticado, mas sem permissão necessária para acessar esta rota.',
        error: { code: 'RBAC_PERMISSION_REQUIRED', details: [{ requiredPermissions: listaPermissoes, userPermissions: permissoesUsuario }] }
      })
    }

    return next()
  }
}

module.exports = permissoesRoles
