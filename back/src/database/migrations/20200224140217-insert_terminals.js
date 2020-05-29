'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('terminais', [
      {
        endereco_mac: '11a2s5s5aa5s6997',
        modelo: 'Moderninha Mini',
        fabricante: 'Pag-Seguro',
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('terminais', null, {});
  }
};
