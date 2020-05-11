module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      id_chip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      saldo: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      bloqueado: {
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
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('cartoes');
  }
};
