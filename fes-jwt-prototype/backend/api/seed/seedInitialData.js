const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

module.exports = {
  async up() {
    const [admMaster] = await database.roles.findOrCreate({
      where: { nome: 'AdmMaster' },
      defaults: {
        id: uuid.v4(),
        nome: 'AdmMaster',
        descricao: 'Administrador mestre com acesso global.'
      }
    })

    const [userFinal] = await database.roles.findOrCreate({
      where: { nome: 'UserFinal' },
      defaults: {
        id: uuid.v4(),
        nome: 'UserFinal',
        descricao: 'Usuário final sem acesso administrativo.'
      }
    })

    const senhaAdmin = await hash('Admin@123', 10)
    const senhaUser = await hash('User@123', 10)

    const [admin] = await database.usuarios.unscoped().findOrCreate({
      where: { email: 'admmaster@fictional.local' },
      defaults: {
        id: uuid.v4(),
        nome: 'Adm Master Fictício',
        email: 'admmaster@fictional.local',
        senha: senhaAdmin,
        departamento: 'Infraestrutura',
        status: 'ATIVO'
      }
    })

    const [userRh] = await database.usuarios.unscoped().findOrCreate({
      where: { email: 'rh.user@fictional.local' },
      defaults: {
        id: uuid.v4(),
        nome: 'Colaborador RH Fictício',
        email: 'rh.user@fictional.local',
        senha: senhaUser,
        departamento: 'RH',
        status: 'ATIVO'
      }
    })

    await database.usuarios_roles.findOrCreate({
      where: { usuario_id: admin.id, role_id: admMaster.id },
      defaults: { usuario_id: admin.id, role_id: admMaster.id }
    })

    await database.usuarios_roles.findOrCreate({
      where: { usuario_id: userRh.id, role_id: userFinal.id },
      defaults: { usuario_id: userRh.id, role_id: userFinal.id }
    })
  },

  async down() {
    await database.usuarios_roles.destroy({ where: {} })
    await database.usuarios.destroy({
      where: {
        email: [
          'admmaster@fictional.local',
          'rh.user@fictional.local'
        ]
      }
    })
    await database.roles.destroy({
      where: {
        nome: ['AdmMaster', 'UserFinal']
      }
    })
  }
}


