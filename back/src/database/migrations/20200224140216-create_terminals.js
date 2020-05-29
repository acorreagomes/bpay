module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('terminais', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      endereco_mac: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fabricante: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('terminais');
  }
};
