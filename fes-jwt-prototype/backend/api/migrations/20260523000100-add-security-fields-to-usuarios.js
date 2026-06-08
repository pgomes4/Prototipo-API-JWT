'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'departamento', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('usuarios', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'ATIVO'
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('usuarios', 'departamento')
    await queryInterface.removeColumn('usuarios', 'status')
  }
}
