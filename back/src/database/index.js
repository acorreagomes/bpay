import Sequelize from 'sequelize';
import Usuario from '../app/models/Usuarios';
import Cliente from '../app/models/Clientes';
import Transacao from '../app/models/Transacoes';
import Cartao from '../app/models/Cartoes';
import Evento from '../app/models/Eventos';
import Terminal from '../app/models/Terminais';
import Produtor from '../app/models/Produtores';
import Setor from '../app/models/Setores';
import PerfilUsuario from '../app/models/PerfilUsuario';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  Cliente,
  Transacao,
  Cartao,
  Evento,
  Terminal,
  Produtor,
  Setor,
  PerfilUsuario];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
