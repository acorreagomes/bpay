'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('usuarios_setores', [
      {
        id_usuario: 1,
        id_setor: 1,
      },
      {
        id_usuario: 2,
        id_setor: 3,
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('usuarios_setores', null, {});
  }
};
