import * as Yup from 'yup';
import Cliente from '../models/Clientes';

class ClienteController {

  async store(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      documento: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const DocumentExists = await Cliente.findOne({ where: { documento: req.body.documento } });
    if (DocumentExists) {
      return res.status(400).json({ error: 'Documento já existente' });
    }

    const { id, nome, documento } = await Cliente.create(req.body);
    return res.json({
      id,
      nome,
      documento
    });
  }

  async index(req, res) {
    const cliente = await Cliente.findOne({ where: { documento: req.params.documento } });

    if (!cliente) {
      res.status(404).json({ error: 'Cliente não Encontrado' });
    }

    return res.json(cliente);
  }

}

export default new ClienteController();
