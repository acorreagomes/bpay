module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('setores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_evento: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome_setor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      criado_em: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      alterado_em: {
        type: 'TIMESTAMP'
      }
    }).then(() => queryInterface.addConstraint('setores', ['id_evento'], {
      type: 'FOREIGN KEY',
      name: 'FK_SetoresIdEvento_Eventos',
      references: {
        table: 'eventos',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('setores');
  }
};





