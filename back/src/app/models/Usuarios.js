import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      admin: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async Usuario => {
      if (Usuario.senha) {
        Usuario.senha = await bcrypt.hash(Usuario.senha, 8);
      }
    });
    return this;
  }

  checkPassword(senha_hash) {
    return bcrypt.compare(senha_hash, this.senha);
  }
};

export default Usuario;
