import Sequelize, { Model } from 'sequelize';

class Terminais extends Model {
  static init(sequelize) {
    super.init({
      endereco_mac: Sequelize.STRING,
      modelo: Sequelize.STRING,
      fabricante: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
};

export default Terminais;
