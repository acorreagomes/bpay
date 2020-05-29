import Sequelize, { Model } from 'sequelize';

class Transacoes extends Model {
  static init(sequelize) {
    super.init({
      id_setor: Sequelize.INTEGER,
      id_terminal: Sequelize.INTEGER,
      id_usuario: Sequelize.INTEGER,
      id_cartao: Sequelize.INTEGER,
      valor_transacao: Sequelize.DECIMAL,
      forma_pagamento: Sequelize.STRING,
      tipo_operacao_cartao: Sequelize.STRING,
      tipo_operacao_credito: Sequelize.STRING,
      tipo_transacao: Sequelize.STRING,
      descricao_pagamento: Sequelize.STRING,
      descricao_sangria_suprimentos: Sequelize.STRING,
      cancelada: Sequelize.BOOLEAN,
      id_usuario_cancelou: Sequelize.INTEGER,
      data_cancelamento: Sequelize.DATE,
      hora_cancelamento: Sequelize.TIME,
    }, {
      sequelize,
    },
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    this.belongsTo(models.Setores, { foreignKey: 'id_setor', as: 'setor' });
  }
};

export default Transacoes;
