'use strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('produtores', [
    {
      razaosocial: 'Marcio Costa da Silva - ME',
      fantasia: 'Marcinho Costa Producoes',
      cnpj: '12.223.223/0001-51',
    },
    {
      razaosocial: 'Marcos Miotto Producoes',
      fantasia: 'Marcos Miotto',
      cnpj: '12.223.223/0001-52',    },
  ]);
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('produtores', null, {});
  }
};
