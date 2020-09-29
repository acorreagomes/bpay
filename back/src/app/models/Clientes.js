import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      cpf: Sequelize.STRING,
      telefone: Sequelize.STRING,
      email: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
};

export default Cliente;
