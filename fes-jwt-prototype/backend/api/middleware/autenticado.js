const { verify } = require('jsonwebtoken')
const env = require('../config/env')
const { error } = require('../utils/apiResponse')
const database = require('../models')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access token não informado.',
      error: { code: 'AUTH_TOKEN_NOT_PROVIDED', details: [] }
    })
  }

  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Formato do token inválido. Use Bearer <token>.',
      error: { code: 'AUTH_INVALID_TOKEN_FORMAT', details: [] }
    })
  }

  try {
    const payload = verify(token, env.jwtAccessSecret)

    const tokenBlocked = await database.access_token_blacklist.findOne({
      where: {
        token,
        tipo_revogacao: 'TOKEN'
      }
    })

    if (tokenBlocked) {
      return error(
        res,
        401,
        'Token revogado.',
        'AUTH_TOKEN_REVOKED'
      )
    }

    const usuarioBlocked = await database.access_token_blacklist.findOne({
      where: {
        usuario_id: payload.sub,
        tipo_revogacao: 'USER'
      }
    })

    if (usuarioBlocked) {
      return error(
        res,
        403,
        'Usuário bloqueado ou inativo.',
        'USER_BLOCKED'
      )
    }

    const usuario = await database.usuarios.findOne({
      where: {
        id: payload.sub
      }
    })

    if (!usuario) {
      return error(
        res,
        401,
        'Usuário não encontrado.',
        'USER_NOT_FOUND'
      )
    }

    if (usuario.status !== 'ATIVO') {
      return error(
        res,
        403,
        'Usuário bloqueado ou inativo.',
        'USER_BLOCKED'
      )
    }

    req.usuarioId = payload.sub
    req.usuarioEmail = payload.email
    req.usuarioRoles = payload.roles || []
    req.usuarioPermissoes = payload.permissions || []
    req.usuarioDepartamento = payload.departamento || null

    return next()
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'AUTH_EXPIRED_TOKEN' : 'AUTH_INVALID_TOKEN'
    const message = err.name === 'TokenExpiredError' ? 'Access token expirado.' : 'Access token inválido.'

    return res.status(401).json({
      success: false,
      message,
      error: { code, details: [] }
    })
  }
}
