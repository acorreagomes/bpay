import Sequelize, { Model } from 'sequelize';

class Transacoes extends Model {
  static init(sequelize) {
    super.init({
      id_setor: Sequelize.INTEGER,
      id_terminal: Sequelize.INTEGER,
      id_usuario: Sequelize.INTEGER,
      id_cartao: Sequelize.INTEGER,
      endereco_mac: Sequelize.STRING,
      valor_transacao: Sequelize.DECIMAL,
      forma_pagamento: Sequelize.CHAR,
      tipo_operacao_cartao: Sequelize.CHAR,
      tipo_operacao_credito: Sequelize.CHAR,
      tipo_transacao: Sequelize.CHAR,
      descricao_pagamento: Sequelize.STRING,
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
