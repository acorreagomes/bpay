'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('usuarios', [
      {
        id_perfil_usuario: 0,
        nome: 'Alessandro Correa Gomes',
        email: 'acorreagomes@gmail.com',
        senha: '$2y$12$0IO3cjrigiH46RVO4ROVuepNcYjLZKxGKOp.nUiH/evIwylNkO46G',
      },
      {
        id_perfil_usuario: 3,
        nome: 'Vinicius Augusto Moura de Oliveira',
        email: 'vmouraaa@gmail.com',
        senha: '$2y$12$0IO3cjrigiH46RVO4ROVuepNcYjLZKxGKOp.nUiH/evIwylNkO46G',
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
