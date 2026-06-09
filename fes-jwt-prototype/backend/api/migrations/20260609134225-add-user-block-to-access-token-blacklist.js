'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('access_token_blacklist', 'token',{
      type: Sequelize.TEXT,
      allowNull: true
    })
    await queryInterface.addColumn('access_token_blacklist', 'usuario_id',{
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addColumn('access_token_blacklist', 'email',{
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('access_token_blacklist', 'tipo_revogacao',{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'TOKEN'
    })
    await queryInterface.addColumn('access_token_blacklist', 'reason',{
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('access_token_blacklist', 'revoked_at',{
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('access_token_blacklist', 'revoked_at')
    await queryInterface.removeColumn('access_token_blacklist', 'reason')
    await queryInterface.removeColumn('access_token_blacklist', 'tipo_revogacao')
    await queryInterface.removeColumn('access_token_blacklist', 'email')
    await queryInterface.removeColumn('access_token_blacklist', 'usuario_id')

    await queryInterface.changeColumn('access_token_blacklist', 'token', {
      type: Sequelize.TEXT,
      allowNull: false
    })
  }
}
