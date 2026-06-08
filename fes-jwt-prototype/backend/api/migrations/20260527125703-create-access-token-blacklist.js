'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('access_token_blacklist', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
      updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
    })
},

  async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('access_token_blacklist')
}
}

