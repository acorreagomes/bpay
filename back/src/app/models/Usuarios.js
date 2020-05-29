import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      id_perfil_usuario: Sequelize.INTEGER,
      id_produtor: Sequelize.INTEGER,
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
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
  static associate(models) {
    this.belongsTo(models.PerfilUsuarios, { foreignKey: 'id_perfil_usuario', as: 'perfil_usuarios' });
  }
  checkPassword(senha_hash) {
    return bcrypt.compare(senha_hash, this.senha);
  }
};

export default Usuario;
