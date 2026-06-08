'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class refresh_tokens extends Model {
    static associate(models) {
      refresh_tokens.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      })
    }
  }

  refresh_tokens.init({
    usuario_id: DataTypes.UUID,
    token_hash: DataTypes.STRING,
    expires_at: DataTypes.DATE,
    revoked_at: DataTypes.DATE,
    reason_revoked: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refresh_tokens'
  })

  return refresh_tokens
}
