'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('setores', [
      {
        id_evento: 1,
        nome_setor: 'Barraca do Lulinha',
      },
      {
        id_evento: 1,
        nome_setor: 'Pacoca e cia',
      },
      {
        id_evento: 1,
        nome_setor: 'Barraca do Sr. Alipio',
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('setores', null, {});
  }
};
