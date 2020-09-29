'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('dormitorios_cliente', [
      {
        id_dormitorio: 1,
        id_cliente: 1,
      },
      {
        id_dormitorio: 1,
        id_cliente: 2,
      },
      {
        id_dormitorio: 2,
        id_cliente: 2,
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('dormitorios_cliente', null, {});
  }
};
