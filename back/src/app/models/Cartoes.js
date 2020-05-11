import Sequelize, { Model } from 'sequelize';

class Cartoes extends Model {
  static init(sequelize) {
    super.init({
      id_cliente: Sequelize.INTEGER,
      id_chip: Sequelize.STRING,
      numero: Sequelize.STRING,
      saldo: Sequelize.DECIMAL,
      bloqueado: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
  }
};

export default Cartoes;
