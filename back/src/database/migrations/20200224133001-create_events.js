module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_produtor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome_evento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_termino: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hora_termino: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      valor_min_parcelamento: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      percentual_juros_parcelamento: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      qtde_max_parcelas: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      liberado: {
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
    }).then(() => queryInterface.addConstraint('eventos', ['id_produtor'], {
      type: 'FOREIGN KEY',
      name: 'FK_eventosIdProdutor_produtores',
      references: {
        table: 'produtores',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('eventos');
  }
};
