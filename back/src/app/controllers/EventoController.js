import Sequelize from 'sequelize';
import * as Yup from 'yup';
import Produtor from '../models/Produtores';
import Evento from '../models/Eventos';
import Setor from '../models/Setores';
import Transacao from '../models/Transacoes';
import { format } from 'date-fns';

class EventoController {

  async eventoProdutor(req, res) {
    const produtor = await Produtor.findOne({ where: { cnpj: req.query.cnpj } });
    if (!produtor) {
      return res.status(200).json({ error: 'Produtor não Encontrado' });
    }
    if (produtor.bloqueado) {
      return res.status(200).json({ error: 'Produtor com problemas de Cadastro!' });
    }
    const eventoProdutor = await Evento.findAll({
      where: {
        id_produtor: produtor.id,
        liberado: true,
        data_inicio: format(new Date(), 'yyyy-MM-dd'),
      },
    });
    if (!eventoProdutor) {
      return res.status(200).json({ error: 'Nenhum Evento Encontrado para esse Produtor' });
    };
    return res.json(eventoProdutor);
  };

  async eventoRelatorio(req, res) {
    const setor = await Setor.findAll({ where: { id_evento: req.params.id } });
    const setoresCodigo = [];
    setor.map(setores => setoresCodigo.push(setores.id));

    const totalRecargas = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'C',
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total']],
      raw: true,
    });

    const totalRecargasCredito = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'C',
        forma_pagamento: 'C',
        tipo_operacao_cartao: 'C'
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total']],
      raw: true,
    });

    const totalRecargasDebito = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'C',
        forma_pagamento: 'C',
        tipo_operacao_cartao: 'D'
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total']],
      raw: true,
    });

    const totalRecargasDinheiro = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'C',
        forma_pagamento: 'D'
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total']],
      raw: true,
    });

    const totalVendas = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'D',
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total']],
      raw: true,
    });

    const totalVendaSetores = await Transacao.findAll({
      where: {
        id_setor: setoresCodigo,
        tipo_transacao: 'D',
      },
      attributes: ['id_setor', 'setor.nome_setor',
        [Sequelize.fn('sum', Sequelize.col('valor_transacao')), 'Total'],
      ],
      include: [
        {
          model: Setor, as: 'setor',
          attributes: [],
        }
      ],
      raw: true,
      group: ['id_setor', 'nome_setor']
    });

    return res.json({
      'TotalRecargas': Number(totalRecargas[0].Total, 2),
      'TotalRecargasCredito': Number(totalRecargasCredito[0].Total, 2),
      'TotalRecargasDebito': Number(totalRecargasDebito[0].Total, 2),
      'TotalRecargasDinheiro': Number(totalRecargasDinheiro[0].Total, 2),
      'TotalVendas': Number(totalVendas[0].Total, 2),
      'SaldoRestante': Number((totalRecargas[0].Total - totalVendas[0].Total).toFixed(2), 2),
      'TotalVendaSetores': totalVendaSetores,
    });
  };

  async store(req, res) {

    const schema = Yup.object().shape({
      id_produtor: Yup.number().required(),
      nome_evento: Yup.string().required(),
      data_inicio: Yup.date().required(),
      data_termino: Yup.date().required(),
      hora_inicio: Yup.string().required(),
      hora_termino: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const { data_inicio, data_termino, hora_inicio, hora_termino } = req.body;

    if (data_inicio > data_termino) {
      return res.status(400).json({ error: 'Data Término deve ser posterior ou igual a de Início' });
    }

    if (hora_inicio >= hora_termino && data_termino == data_inicio) {
      return res.status(400).json({ error: 'Hora Término deve ser posterior a de Início' });
    }

    const produtor = await Produtor.findByPk(req.body.id_produtor);
    if (!produtor) {
      return res.status(400).json({ error: 'Produtor não Encontrado' });
    }

    const eventoExistente = await Evento.findOne({ where: { nome_evento: req.body.nome_evento } });
    if (eventoExistente) {
      return res.status(400).json({ error: 'Duplicidade de Eventos' });
    }

    const evento = await Evento.create(req.body);
    return res.json(evento);
  }

}

export default new EventoController();
