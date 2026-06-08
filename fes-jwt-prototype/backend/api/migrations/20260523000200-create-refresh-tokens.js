'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      token_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      revoked_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      reason_revoked: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('refresh_tokens')
  }
}
