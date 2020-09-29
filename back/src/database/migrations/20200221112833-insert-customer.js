'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('clientes', [
      {
        nome: 'Alessandro Correa Gomes',
        cpf: '374.233.248-17',
        telefone: '(17)99638-8282',
        email: 'acorreagomes@gmail.com', 
      },
      {
        nome: 'Aldo Roberto da Silva',
        cpf: '374.233.248-18',
        telefone: '(17)99792-9436',
        email: 'aldo.roberto.mania@gmail.com', 
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('clientes', null, {});
  }
};
