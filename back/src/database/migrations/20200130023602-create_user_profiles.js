module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('perfil_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome_perfil: {
        type: Sequelize.STRING,
        allowNull: false
      },
      acessa_recargas: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acessa_vendas: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acessa_consulta_cartao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acessa_dados_evento: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acessa_relatorios: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acessa_configuracoes: {
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
    return queryInterface.dropTable('perfil_usuarios');
  }
};


// module.exports = {
//   up: function (migration, DataTypes, done) {
//     migration.createTable('perfil_usuarios', {
//       id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       nome_perfil: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       acessa_recargas: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       acessa_vendas: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       acessa_consulta_cartao: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       acessa_dados_evento: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       acessa_relatorios: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       acessa_configuracoes: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       criado_em: {
//         type: 'TIMESTAMP',
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//       alterado_em: {
//         type: 'TIMESTAMP'
//       }
//     }).complete(function () {
//       migration.sequelize.query(migration.QueryGenerator.bulkInsertQuery('perfil_usuarios', [{
//         nome_perfil: 'Administrador',
//       }, {
//         nome_perfil: 'Produtor',
//       }, {
//         nome_perfil: 'Operador',
//       },
//       {
//         nome_perfil: 'Vendedor',
//       },
//       ])).complete(done);
//     });
//   },
//   down: function (migration, DataTypes, done) {
//     migration.dropTable('perfil_usuarios').complete(done);
//   }
// };
