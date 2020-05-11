import Sequelize, { Model } from 'sequelize';

class Produtores extends Model {
  static init(sequelize) {
    super.init({
      razaosocial: Sequelize.STRING,
      fantasia: Sequelize.STRING,
      cnpj: Sequelize.STRING,
      bloqueado: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  }
};

export default Produtores;
