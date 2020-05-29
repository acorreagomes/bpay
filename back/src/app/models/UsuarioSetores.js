import Sequelize, { Model } from 'sequelize';

class UsuarioSetores extends Model {
  static init(sequelize) {
    super.init({
      id_usuario: Sequelize.INTEGER,
      id_setor: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
};

export default UsuarioSetores;
