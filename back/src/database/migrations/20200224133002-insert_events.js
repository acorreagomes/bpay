'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('eventos', [
      {
        id_produtor: 1,
        nome_evento: 'Buteco do Gusttavo Lima',
        data_inicio: '2020-10-10',
        data_termino: '2020-10-12',
        hora_inicio: '22:00:00',
        hora_termino: '06:00:00'
      },
      {
        id_produtor: 1,
        nome_evento: 'Cabare',
        data_inicio: '2020-10-12',
        data_termino: '2020-10-13',
        hora_inicio: '23:00:00',
        hora_termino: '07:00:00',
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('eventos', null, {});
  }
};
