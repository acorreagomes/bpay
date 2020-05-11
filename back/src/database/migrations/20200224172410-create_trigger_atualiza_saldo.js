module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      " CREATE FUNCTION atualiza_saldo_cartao() RETURNS trigger AS $$ " +
      " BEGIN " +
      "    IF NEW.tipo_transacao = 'C' THEN " +
      "    update cartoes set saldo = saldo + NEW.valor_transacao where id = NEW.id_cartao; " +
      "     END IF; " +
      "     " +
      "   IF NEW.tipo_transacao = 'D' THEN " +
      "    update cartoes set saldo = saldo - NEW.valor_transacao where id = NEW.id_cartao; " +
      "     END IF; " +
      "     RETURN NEW; " +
      " END; " +
      " $$ " +
      " LANGUAGE plpgsql; " +
      " " +
      " CREATE TRIGGER atualiza_saldo AFTER INSERT ON transacoes " +
      "     FOR EACH ROW EXECUTE PROCEDURE atualiza_saldo_cartao(); ");

  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(
      " DROP TRIGGER IF EXISTS atualiza_saldo " +
      " ON transacoes CASCADE; " +
      " DROP FUNCTION atualiza_saldo_cartao ");
  }
};
