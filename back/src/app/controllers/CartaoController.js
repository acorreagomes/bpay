import * as Yup from 'yup';
import Cartao from '../models/Cartoes';
import Cliente from '../models/Clientes';
import Evento from '../models/Eventos';
import Produtor from '../models/Produtores';
import Transacao from '../models/Transacoes';
import Usuario from '../models/Usuarios';
import Setor from '../models/Setores';
import Funcoes from '../utils/Funcoes';


class CartaoController {

  async store(req, res) {

    const schema = Yup.object().shape({
      id_chip: Yup.string().required(),
      id_evento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const evento = await Evento.findByPk(req.body.id_evento);

    if (!evento) {
      return res.status(400).json({ error: 'Evento não Encontrado' });
    }

    if (!evento.liberado) {
      return res.status(400).json({ error: 'Evento não Liberado' });
    }

    const produtor = await Produtor.findByPk(evento.id_produtor);

    if (!produtor) {
      return res.status(200).json({ error: 'Produtor não Encontrado' });
    }

    if (produtor.bloqueado) {
      return res.status(200).json({ error: 'Produtor Bloqueado' });
    }

    const calculatedCardNumber = Funcoes.CalculatedCardNumber(req.body.id_chip, req.body.id_evento);

    const cartaoExiste = await Cartao.findOne({ where: { numero: calculatedCardNumber } });

    if (cartaoExiste) {
      return res.status(400).json({ error: 'Duplicidade de Cartões' });
    };

    const { id_cliente } = req.body;

    if (id_cliente) {

      const clienteExiste = await Cliente.findByPk(id_cliente);

      if (!clienteExiste) {
        return res.status(400).json({ error: 'Cliente não Encontrado' });
      };
    };


    req.body.numero = calculatedCardNumber;
    const cartao = await Cartao.create(req.body);
    return res.json(cartao);
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      numero_cartao_origem: Yup.string().required(),
      numero_cartao_destino: Yup.string().required(),
      valor_transferencia: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const cartaoOrigem = await Cartao.findOne({ where: { numero: req.body.numero_cartao_origem } });

    if (!cartaoOrigem) {
      return res.status(200).json({ error: 'Cartão de Origem não Encontrado' });
    };

    if (cartaoOrigem.bloqueado) {
      return res.status(200).json({ error: 'Cartão de Origem está Bloqueado' });
    };

    if (req.body.valor_transferencia > cartaoOrigem.saldo) {
      return res.status(200).json({ error: 'Saldo de transferencia Insuficiente' });
    };

    const cartaoDestino = await Cartao.findOne({ where: { numero: req.body.numero_cartao_destino } });

    if (!cartaoDestino) {
      return res.status(200).json({ error: 'Cartão de Destino não Encontrado' });
    };

    if (cartaoDestino.bloqueado) {
      return res.status(200).json({ error: 'Cartão de Destino está Bloqueado' });
    };

    cartaoOrigem.saldo = Number(cartaoOrigem.saldo) - Number(req.body.valor_transferencia);
    cartaoOrigem.save();

    cartaoDestino.saldo = Number(cartaoDestino.saldo) + Number(req.body.valor_transferencia);
    cartaoDestino.save();

    return res.json({ sucesso: 'Transferencia efetuada com Sucesso' });
  }

  async bloqueio(req, res) {

    const schema = Yup.object().shape({
      numero: Yup.string().required(),
      bloquear: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const cartao = await Cartao.findOne({ where: { numero: req.body.numero } });

    if (!cartao) {
      return res.status(200).json({ error: 'Cartão não Encontrado' });
    };

    cartao.bloqueado = req.body.bloquear;
    cartao.save();

    if (req.body.bloquear) {
      return res.json({ sucesso: 'Cartão bloqueado com sucesso' });
    } else {
      return res.json({ sucesso: 'Cartão desbloqueado com sucesso' });
    }

  }

  async situacao(req, res) {
    const cartao = await Cartao.findOne({
      where: { numero: req.query.numero },
      attributes: ['id', 'id_chip', 'numero', 'saldo', 'bloqueado'],
      include: [
        {
          model: Cliente, as: 'cliente',
          attributes: ['id', 'nome', 'cpf', 'telefone', 'email'],
        }
      ]
    });
    if (!cartao) {
      return res.status(200).json({ error: 'Cartão não Encontrado' });
    };
    if (cartao.bloqueado) {
      return res.status(200).json({ error: 'Cartão Bloqueado' });
    };
    const extratoCartao = await Transacao.findAll({
      where: {
        id_cartao: cartao.id,
      },
      order: ['data_hora_transacao'],
      attributes: [
        'id',
        'valor_transacao',
        'tipo_transacao',
        'forma_pagamento',
        'tipo_operacao_cartao',
        'data_hora_transacao',
        'cancelada'],
      include: [
        {
          model: Usuario, as: 'usuario',
          attributes: ['id', 'nome'],
        },
        {
          model: Setor, as: 'setor',
          attributes: ['id', 'nome_setor'],
        }
      ],

    })

    return res.json({
      cartao,
      'extrato': extratoCartao
    });
  };

}

export default new CartaoController();
