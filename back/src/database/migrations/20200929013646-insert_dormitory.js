'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('dormitorios', [
      {
        dormitorio: 'SUÍTE 01',
        tipo: 'MASCULINO',
        capacidade: 5,
      },
      {
        dormitorio: 'SUÍTE 02',
        tipo: 'FEMININO',
        capacidade: 8,
      },
      {
        dormitorio: 'SUÍTE 03',
        tipo: 'MISTO',
        capacidade: 6,
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('dormitorios', null, {});
  }
};
