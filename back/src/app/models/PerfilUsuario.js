import Sequelize, { Model } from 'sequelize';

class PerfilUsuario extends Model {
  static init(sequelize) {
    super.init({
      nome_perfil: Sequelize.STRING,
      acessa_recargas: Sequelize.BOOLEAN,
      acessa_vendas: Sequelize.BOOLEAN,
      acessa_consulta_cartao: Sequelize.BOOLEAN,
      acessa_dados_evento: Sequelize.BOOLEAN,
      acessa_relatorios: Sequelize.BOOLEAN,
      acessa_configuracoes: Sequelize.BOOLEAN,
    }, {
      sequelize,
    },
    );
    return this;
  }
};

export default PerfilUsuario;
