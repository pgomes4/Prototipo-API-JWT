const database = require('../models')
const { compare, hash } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
const uuid = require('uuid')
const env = require('../config/env')


function addDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}


class AuthService {
  async buscarUsuarioComRoles(email) {
    return database.usuarios.unscoped().findOne({
      attributes: ['id', 'nome', 'email', 'senha', 'departamento', 'status'],
      where: { email },
      include: [
        {
          model: database.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao'],
          through: { attributes: [] },
          include: [
            {
              model: database.permissoes,
              as: 'roles_das_permissoes',
              attributes: ['id', 'nome', 'descricao'],
              through: { attributes: [] }
            }
          ]
        }
      ]
    })
  }


  montarUsuarioSeguro(usuario) {
    const roles = usuario.usuario_roles?.map((role) => role.nome) || []


    const permissions = usuario.usuario_roles?.flatMap((role) => {
      return role.roles_das_permissoes?.map((permissao) => permissao.nome) || []
    }) || []


    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      departamento: usuario.departamento,
      status: usuario.status,
      roles,
      permissions: [...new Set(permissions)]
    }
  }


  gerarAccessToken(usuarioSeguro) {
    return sign(
      {
        sub: usuarioSeguro.id,
        email: usuarioSeguro.email,
        roles: usuarioSeguro.roles,
        permissions: usuarioSeguro.permissions,
        departamento: usuarioSeguro.departamento
      },
      env.jwtAccessSecret,
      { expiresIn: env.jwtAccessExpiresIn }
    )
  }


  gerarRefreshToken(usuarioSeguro, refreshTokenId) {
    return sign(
      {
        sub: usuarioSeguro.id,
        type: 'refresh',
        tokenId: refreshTokenId
      },
      env.jwtRefreshSecret,
      { expiresIn: env.jwtRefreshExpiresIn }
    )
  }


  async login(dto) {
    const usuario = await this.buscarUsuarioComRoles(dto.email)


    if (!usuario) {
      throw Object.assign(new Error('Credenciais inválidas.'), {
        status: 401,
        code: 'AUTH_INVALID_CREDENTIALS'
      })
    }


    if (usuario.status && usuario.status !== 'ATIVO') {
      throw Object.assign(new Error('Usuário bloqueado ou inativo.'), {
        status: 403,
        code: 'USER_BLOCKED'
      })
    }


    const senhaCorreta = await compare(dto.password, usuario.senha)


    if (!senhaCorreta) {
      throw Object.assign(new Error('Credenciais inválidas.'), {
        status: 401,
        code: 'AUTH_INVALID_CREDENTIALS'
      })
    }


    const usuarioSeguro = this.montarUsuarioSeguro(usuario)
    const refreshTokenId = uuid.v4()
    const accessToken = this.gerarAccessToken(usuarioSeguro)
    const refreshToken = this.gerarRefreshToken(usuarioSeguro, refreshTokenId)
    const tokenHash = await hash(refreshToken, 10)


    await database.refresh_tokens.create({
      id: refreshTokenId,
      usuario_id: usuarioSeguro.id,
      token_hash: tokenHash,
      expires_at: addDays(7)
    })


    return { accessToken, refreshToken, usuario: usuarioSeguro }
  }


  async refresh(refreshToken) {
    if (!refreshToken) {
      throw Object.assign(new Error('Refresh token não informado.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      })
    }


    let payload


    try {
      payload = verify(refreshToken, env.jwtRefreshSecret)
    } catch (error) {
      throw Object.assign(new Error('Refresh token inválido ou expirado.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      })
    }


    if (payload.type !== 'refresh' || !payload.tokenId) {
      throw Object.assign(new Error('Refresh token inválido.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      })
    }


    const registro = await database.refresh_tokens.findOne({
      where: { id: payload.tokenId }
    })


    if (!registro) {
      throw Object.assign(new Error('Refresh token não encontrado.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      })
    }


    if (registro.revoked_at) {
      throw Object.assign(new Error('Refresh token revogado.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_REVOKED'
      })
    }


    if (new Date(registro.expires_at) < new Date()) {
      throw Object.assign(new Error('Refresh token expirado.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_EXPIRED'
      })
    }


    const tokenConfere = await compare(refreshToken, registro.token_hash)


    if (!tokenConfere) {
      throw Object.assign(new Error('Refresh token inválido.'), {
        status: 401,
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      })
    }


    const usuario = await database.usuarios.findOne({
      where: { id: payload.sub },
      include: [
        {
          model: database.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao'],
          through: { attributes: [] },
          include: [
            {
              model: database.permissoes,
              as: 'roles_das_permissoes',
              attributes: ['id', 'nome', 'descricao'],
              through: { attributes: [] }
            }
          ]
        }
      ]
    })


    if (!usuario) {
      throw Object.assign(new Error('Usuário não encontrado.'), {
        status: 401,
        code: 'USER_NOT_FOUND'
      })
    }


    if (usuario.status !== 'ATIVO') {
      await database.refresh_tokens.update(
        {
          revoked_at: new Date(),
          reason_revoked: 'USER_INACTIVATED'
        },
        {
          where: {
            usuario_id: usuario.id,
            revoked_at: null
          }
        }
      )


      throw Object.assign(new Error('Usuário bloqueado ou inativo.'), {
        status: 403,
        code: 'USER_BLOCKED'
      })
    }


    const usuarioSeguro = this.montarUsuarioSeguro(usuario)
    const accessToken = this.gerarAccessToken(usuarioSeguro)


    return { accessToken, usuario: usuarioSeguro }
  }


  async logout(refreshToken, accessToken) {
    if (!refreshToken) {
      throw {
        status: 400,
        message: 'Refresh token não informado.',
        code: 'AUTH_REFRESH_TOKEN_REQUIRED'
      }
    }


    let decodedRefresh


    try {
      decodedRefresh = verify(refreshToken, env.jwtRefreshSecret)
    } catch (err) {
      throw {
        status: 401,
        message: 'Refresh token inválido ou expirado.',
        code: 'AUTH_REFRESH_TOKEN_INVALID'
      }
    }


    await database.refresh_tokens.update(
      {
        revoked_at: new Date(),
        reason_revoked: 'LOGOUT'
      },
      {
        where: {
          id: decodedRefresh.tokenId,
          revoked_at: null
        }
      }
    )


    if (accessToken) {
      const decodedAccess = verify(accessToken, env.jwtAccessSecret)


      await database.access_token_blacklist.create({
        token: accessToken,
        usuario_id: decodedAccess.sub,
        email: decodedAccess.email,
        tipo_revogacao: 'TOKEN',
        reason: 'LOGOUT',
        expires_at: new Date(decodedAccess.exp * 1000),
        revoked_at: new Date()
      })
    }


    return {
      revoked: true
    }
  }


  async inativarUsuarioPorEmail(email) {
    if (!email) {
      throw {
        status: 400,
        message: 'Email não informado.',
        code: 'EMAIL_REQUIRED'
      }
    }


    const usuario = await database.usuarios.findOne({
      where: { email }
    })


    if (!usuario) {
      throw {
        status: 404,
        message: 'Usuário não encontrado.',
        code: 'USER_NOT_FOUND'
      }
    }


    await database.usuarios.update(
      {
        status: 'INATIVO'
      },
      {
        where: {
          id: usuario.id
        }
      }
    )


    await database.refresh_tokens.update(
      {
        revoked_at: new Date(),
        reason_revoked: 'USER_INACTIVATED'
      },
      {
        where: {
          usuario_id: usuario.id,
          revoked_at: null
        }
      }
    )


    await database.access_token_blacklist.create({
      token: null,
      usuario_id: usuario.id,
      email: usuario.email,
      tipo_revogacao: 'USER',
      reason: 'USER_INACTIVATED',
      expires_at: addDays(7),
      revoked_at: new Date()
    })


    return {
      usuario_id: usuario.id,
      email: usuario.email,
      status: 'INATIVO',
      refreshTokensRevogados: true,
      accessTokensBloqueadosPorUsuario: true
    }
  }
}


module.exports = AuthService
