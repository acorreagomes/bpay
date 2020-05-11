import Sequelize, { Model } from 'sequelize';

class Setores extends Model {
  static init(sequelize) {
    super.init({
      id_evento: Sequelize.INTEGER,
      nome_setor: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
};

export default Setores;
