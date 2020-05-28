'use strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('perfil_usuarios', [
    {
      nome_perfil: 'Administrador',
    },
    {
      nome_perfil: 'Produtor',
    },
    {
      nome_perfil: 'Operador',
    },
    {
      nome_perfil: 'Vendedor',
    },
  ]);
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('perfil_usuarios', null, {});
  }
};
