import * as Yup from 'yup';
import Terminais from '../models/Terminais';
import Transacoes from '../models/Transacoes';
import Usuario from '../models/Usuarios';
import Setor from '../models/Setores';

class TerminaisController {

  async store(req, res) {

    const schema = Yup.object().shape({
      endereco_mac: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const MacExistente = await Terminais.findOne({ where: { endereco_mac: req.body.endereco_mac } });
    if (MacExistente) {
      const { id } = MacExistente;
      return res.json({ id });
    } else {
      const { id } = await Terminais.create(req.body);
      return res.json({ id });
    }
  }

  async lancamentos(req, res) {

    const setor = await Setor.findAll({ where: { id_evento: req.query.id_evento } });
    const setoresCodigo = [];
    setor.map(setores => setoresCodigo.push(setores.id));

    const dadosTerminal = await Terminais.findOne({
    where: { id : req.query.id_terminal },
    attributes:
     [
       'id',
       'endereco_mac',
       'modelo',
       'fabricante'
     ],
    })
    if (!dadosTerminal) {
      return res.status(200).json({ error: 'Terminal não Encontrado' });
    };
    const lancamentosTerminal = await Transacoes.findAll({
      where: {
        id_terminal: req.query.id_terminal,
        id_setor: setoresCodigo,
        tipo_transacao:
        [
          "SANGRIA",
          "SUPRIMENTO",
          "SALDO_INICIAL"
        ],
       },
      attributes:
      [
        'id',
        'valor_transacao',
        'tipo_transacao',
        'cancelada',
        'descricao_sangria_suprimentos'
      ],
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
      order: ['id']});

    res.json({
      'terminal': dadosTerminal,
      'lancamentos': lancamentosTerminal,
    });
  }

}

export default new TerminaisController();
