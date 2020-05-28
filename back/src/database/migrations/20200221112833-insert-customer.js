'use strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('clientes', [
    {
      nome: 'Alessandro Correa Gomes',
      documento: '374.233.248-17',
    },
    {
      nome: 'Aldo Roberto da Silva',
      documento: '374.233.248-18',
    },
  ]);
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('clientes', null, {});
  }
};
