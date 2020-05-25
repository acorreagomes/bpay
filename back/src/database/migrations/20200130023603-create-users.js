module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_perfil_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      criado_em: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      alterado_em: {
        type: 'TIMESTAMP'
      }
    }).then(() => queryInterface.addConstraint('usuarios', ['id_perfil_usuario'], {
      type: 'FOREIGN KEY',
      name: 'FK_UsuariosIdPerfil_Usuario',
      references: {
        table: 'perfil_usuario',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('usuarios');
  }
};
