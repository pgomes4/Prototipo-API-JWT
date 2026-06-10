const { usuarios, refresh_tokens, access_token_blacklist } = require('../models');
const { STATUS_USUARIO } = require('../utils/lifecycleStatus');

class LifecycleService {
  async buscarUsuarioPorEmail(email) {
    const usuario = await usuarios.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    return usuario;
  }

  async revogarRefreshTokensDoUsuario(usuarioId, motivo) {
    await refresh_tokens.update(
      {
        revoked_at: new Date(),
        reason_revoked: motivo,
      },
      {
        where: {
          usuario_id: usuarioId,
          revoked_at: null,
        },
      }
    );
  }

  async bloquearUsuarioNaBlacklist(usuario, motivo) {
    await access_token_blacklist.create({
      usuario_id: usuario.id,
      email: usuario.email,
      token: null,
      tipo_revogacao: 'USER',
      reason: motivo,
      expires_at: new Date('9999-12-31'),
      revoked_at: new Date(),
    });
  }

  async inativarUsuarioPorEmail(email) {
    const usuario = await this.buscarUsuarioPorEmail(email);

    if (usuario.status === STATUS_USUARIO.INATIVO) {
      throw new Error('Usuário já está inativo.');
    }

    usuario.status = STATUS_USUARIO.INATIVO;
    await usuario.save();

    const motivo = 'Usuário inativado manualmente.';

    await this.revogarRefreshTokensDoUsuario(usuario.id, motivo);
    await this.bloquearUsuarioNaBlacklist(usuario, motivo);

    return {
      mensagem: 'Usuário inativado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
      },
    };
  }
}

module.exports = new LifecycleService();