'use strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('cartoes', [
    {
      id_chip: 'AFD51E51',
      numero: 'ea5660b89fdc570b5b56534e16f5e412',
    },
    {
      id_chip: '692CD0D9',
      numero: '8825726017da01515a41a28d6c2c1548',
    },
  ]);
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('cartoes', null, {});
  }
};
