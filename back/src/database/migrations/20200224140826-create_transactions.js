module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transacoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_setor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_terminal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_cartao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endereco_mac: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor_transacao: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      forma_pagamento: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      tipo_operacao_cartao: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      tipo_operacao_credito: {
        type: Sequelize.CHAR(1),
        allowNull: true
      },
      tipo_transacao: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      descricao_pagamento: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cancelada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      id_usuario_cancelou: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      data_cancelamento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hora_cancelamento: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      data_hora_transacao: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }).then(() => queryInterface.addConstraint('transacoes', ['id_setor'], {
      type: 'FOREIGN KEY',
      name: 'FK_TransacoesIdSetor_Setores',
      references: {
        table: 'setores',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
      .then(() => queryInterface.addConstraint('transacoes', ['id_terminal'], {
        type: 'FOREIGN KEY',
        name: 'FK_TransacoesIdTerminal_Terminais',
        references: {
          table: 'terminais',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
      .then(() => queryInterface.addConstraint('transacoes', ['id_usuario'], {
        type: 'FOREIGN KEY',
        name: 'FK_TransacoesIdUsuario_Usuarios',
        references: {
          table: 'usuarios',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
      .then(() => queryInterface.addConstraint('transacoes', ['id_usuario_cancelou'], {
        type: 'FOREIGN KEY',
        name: 'FK_TransacoesIdUsuarioCancelou_Usuarios',
        references: {
          table: 'usuarios',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
      .then(() => queryInterface.addConstraint('transacoes', ['id_cartao'], {
        type: 'FOREIGN KEY',
        name: 'FK_TransacoesIdCartao_Cartoes',
        references: {
          table: 'cartoes',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('transacoes');
  }
};





