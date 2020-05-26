import * as Yup from 'yup';
import Transacao from '../models/Transacoes';
import Cartao from '../models/Cartoes';
import Evento from '../models/Eventos';
import Produtor from '../models/Produtores';
import Setor from '../models/Setores';
import Terminal from '../models/Terminais';
import Usuario from '../models/Usuarios'
import Funcoes from '../utils/Funcoes';

class TransacaoController {

  async store(req, res) {

    const schema = Yup.object().shape({
      id_evento: Yup.number().required(),
      id_setor: Yup.number().required(),
      id_chip: Yup.string().required(),
      id_terminal: Yup.number().required(),
      numero_cartao: Yup.string().required(),
      endereco_mac: Yup.string().required(),
      valor_transacao: Yup.number().min(1).required(),
      forma_pagamento: Yup.string().required(),
      tipo_operacao_cartao: Yup.string().required(),
      tipo_transacao: Yup.string().required(),
    });

    req.body.forma_pagamento = req.body.forma_pagamento.toUpperCase();
    req.body.tipo_operacao_cartao = req.body.tipo_operacao_cartao.toUpperCase();
    req.body.tipo_transacao = req.body.tipo_transacao.toUpperCase();
    if (req.body.tipo_operacao_credito) {
      req.body.tipo_operacao_credito = req.body.tipo_operacao_credito.toUpperCase();
    }

    const validTypes = ["C", "D"];
    if ((validTypes.indexOf(req.body.forma_pagamento) == -1) ||
      (validTypes.indexOf(req.body.tipo_operacao_cartao) == -1) ||
      (validTypes.indexOf(req.body.tipo_transacao) == -1)) {
      return res.status(400).json({ error: 'Falha de Validação!' });
    }

    if (req.body.tipo_operacao_credito) {
      const validTypesCredito = ["V", "P"];
      if (validTypesCredito.indexOf(req.body.tipo_operacao_credito) == -1) {
        return res.status(400).json({ error: 'Falha de Validação!' });
      }
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação!' });
    };

    const calculatedCardNumber = Funcoes.CalculatedCardNumber(req.body.id_chip, req.body.id_evento);
    if (calculatedCardNumber != req.body.numero_cartao) {
      return res.status(200).json({ error: 'Composição do Número do Cartão Inválida' });
    }

    const cartao = await Cartao.findOne({ where: { numero: req.body.numero_cartao } });
    if (!cartao) {
      return res.status(200).json({ error: 'Cartão não Encontrado!' });
    };

    if (cartao.bloqueado) {
      return res.status(200).json({ error: 'Cartão Bloqueado!' });
    };

    const { tipo_transacao, valor_transacao } = req.body;

    if (tipo_transacao == 'D') {
      if (valor_transacao > cartao.saldo) {
        return res.status(200).json({ error: 'Saldo Insuficiente!' });
      }
    }

    const evento = await Evento.findByPk(req.body.id_evento);

    if (!evento) {
      return res.status(200).json({ error: 'Evento não Encontrado!' });
    }

    if (!evento.liberado) {
      return res.status(200).json({ error: 'Evento não Liberado!' });
    }

    const dataAtual = Funcoes.getCurrentFullDate();

    if (dataAtual < evento.data_inicio) {
      return res.status(200).json({ error: 'Evento não iniciado!' });
    }

    if (dataAtual > evento.data_termino) {
      return res.status(200).json({ error: 'Evento já finalizado!' });
    }

    const produtor = await Produtor.findByPk(evento.id_produtor);

    if (!produtor) {
      return res.status(200).json({ error: 'Produtor não Encontrado!' });
    }

    if (produtor.bloqueado) {
      return res.status(200).json({ error: 'Produtor Bloqueado!' });
    }

    const terminal = await Terminal.findByPk(req.body.id_terminal);

    if (!terminal) {
      return res.status(200).json({ error: 'Terminal não Encontrado!' });
    }

    const setor = await Setor.findByPk(req.body.id_setor);

    if (!setor) {
      return res.status(200).json({ error: 'Setor não Encontrado!' });
    }

    req.body.id_usuario = req.userId;
    req.body.id_cartao = cartao.id;
    const datas = await Transacao.create(req.body);
    return res.json(datas);
  }

  async cancelamento(req, res) {

    const usuario = await Usuario.findByPk(req.userId);

    if (usuario.id_perfil_usuario !== 0) {
      return res.status(200).json({ error: 'Usuário sem privilégios!' });
    }
    const transacao = await Transacao.findByPk(req.params.id_transacao);
    if (!transacao) {
      return res.status(200).json({ error: 'Transação não encontrada!' });
    }
    if (transacao.cancelada) {
      return res.status(200).json({ error: 'Transação já cancelada!' });
    }
    const setor = await Setor.findByPk(transacao.id_setor);

    const evento = await Evento.findByPk(setor.id_evento);

    if (!evento.liberado) {
      return res.status(200).json({ error: 'Evento não Liberado!' });
    }

    const dataAtual = Funcoes.getCurrentFullDate();

    if (dataAtual < evento.data_inicio) {
      return res.status(200).json({ error: 'Evento não iniciado!' });
    }

    if (dataAtual > evento.data_termino) {
      return res.status(200).json({ error: 'Evento já finalizado!' });
    }

    transacao.cancelada = true;
    transacao.id_usuario_cancelou = req.userId;
    transacao.data_cancelamento = dataAtual;
    transacao.hora_cancelamento = Funcoes.getCurrentFullHour();
    transacao.save();

    res.json(transacao);

  }
}

export default new TransacaoController();
