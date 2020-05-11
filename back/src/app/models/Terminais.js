import Sequelize, { Model } from 'sequelize';

class Terminais extends Model {
  static init(sequelize) {
    super.init({
      numero_serie: Sequelize.STRING,
      modelo: Sequelize.STRING,
      fabricante: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
};

export default Terminais;
