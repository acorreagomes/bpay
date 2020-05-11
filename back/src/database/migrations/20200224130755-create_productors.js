module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      razaosocial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fantasia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      bloqueado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    return queryInterface.dropTable('produtores');
  }
};
