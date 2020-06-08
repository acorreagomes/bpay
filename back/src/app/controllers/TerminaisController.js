import * as Yup from 'yup';
import Terminais from '../models/Terminais';

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
      return res.status(409).json({ error: 'Terminal já cadastrado!' });
    }

    const { id } = await Terminais.create(req.body);
    return res.json({ id });
  }

}

export default new TerminaisController();
