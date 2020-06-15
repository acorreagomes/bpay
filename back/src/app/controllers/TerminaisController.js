import * as Yup from 'yup';
import Terminais from '../models/Terminais';
import Transacoes from '../models/Transacoes';

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
    const dadosTerminal = await Terminais.findOne({ 
    where: {id : req.query.id_terminal},
    attributes: ['id', 'endereco_mac', 'modelo', 'fabricante'],
    })
    if (!dadosTerminal) {
      return res.status(200).json({ error: 'Terminal não Encontrado' });
    };
    // where: { id_terminal: req.query.id_terminal, id_evento: req.query.id_evento}});  pegar depois os eventos dos setores
    const lancamentosTerminal = await Transacoes.findAll({ 
      
      where: { id_terminal: req.query.id_terminal}});
    res.json({
      'terminal': dadosTerminal,
      'lancamentos': lancamentosTerminal,
    });  
    // Depois trazer somente os campos necessários dos lançamentos e somente 'SANGRIA', 'SUPRIMENTOS', 'SALDO_INICIAL'
  }

}

export default new TerminaisController();
