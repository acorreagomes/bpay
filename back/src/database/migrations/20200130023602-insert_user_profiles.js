'use strict';
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('perfil_usuarios', [
      {
        id: 0,
        nome_perfil: 'Administrador',
        acessa_recargas: true,
        acessa_vendas: true,
        acessa_consulta_cartao: true,
        acessa_dados_evento: true,
        acessa_relatorios: true,
        acessa_configuracoes: true,
      },
      {
        id: 1,
        nome_perfil: 'Produtor',
        acessa_recargas: true,
        acessa_vendas: true,
        acessa_consulta_cartao: true,
        acessa_dados_evento: true,
        acessa_relatorios: true,
        acessa_configuracoes: true,
      },
      {
        id: 2,
        nome_perfil: 'Operador',
        acessa_recargas: true,
        acessa_vendas: false,
        acessa_consulta_cartao: true,
        acessa_dados_evento: true,
        acessa_relatorios: false,
        acessa_configuracoes: false,
      },
      {
        id: 3,
        nome_perfil: 'Vendedor',
        acessa_recargas: false,
        acessa_vendas: true,
        acessa_consulta_cartao: true,
        acessa_dados_evento: true,
        acessa_relatorios: false,
        acessa_configuracoes: false,
      },
    ]);
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete('perfil_usuarios', null, {});
  }
};
