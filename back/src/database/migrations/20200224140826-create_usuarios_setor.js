module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios_setores', {
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_setor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    }).then(() => queryInterface.addConstraint('usuarios_setores', ['id_usuario'], {
      type: 'FOREIGN KEY',
      name: 'FK_UsuariosSetoresIdUsuario_Usuarios',
      references: {
        table: 'usuarios',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
    .then(() => queryInterface.addConstraint('usuarios_setores', ['id_setor'], {
      type: 'FOREIGN KEY',
      name: 'FK_UsuariosSetoresIdSetor_Setores',
      references: {
        table: 'setores',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('usuarios_setores');
  }
};





