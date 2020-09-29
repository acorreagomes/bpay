import * as Yup from 'yup';
import Produtor from '../models/Produtores';

class ProdutorController {

  async store(req, res) {

    const schema = Yup.object().shape({
      razaosocial: Yup.string().required(),
      cnpj: Yup.string().required().min(14)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const produtorExists = await Produtor.findOne({ where: { cnpj: req.body.cnpj } });
    if (produtorExists) {
      return res.status(400).json({ error: 'Duplicidade de documento CNPJ' });
    }

    const produtor = await Produtor.create(req.body);
    return res.json(produtor);
  }

}

export default new ProdutorController();
