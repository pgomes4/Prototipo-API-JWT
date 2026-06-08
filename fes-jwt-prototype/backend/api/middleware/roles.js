const roles = (listaRoles = []) => {
  return async (req, res, next) => {
    const rolesUsuario = req.usuarioRoles || []
    const possuiRole = rolesUsuario.some((role) => listaRoles.includes(role))

    if (!possuiRole) {
      return res.status(403).json({
        success: false,
        message: 'Usuário autenticado, mas sem role necessária para acessar esta rota.',
        error: { code: 'RBAC_ACCESS_DENIED', details: [{ requiredRoles: listaRoles, userRoles: rolesUsuario }] }
      })
    }

    return next()
  }
}

module.exports = roles
