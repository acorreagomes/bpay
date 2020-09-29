import * as Yup from 'yup';
import Cliente from '../models/Clientes';

class ClienteController {

  async store(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      telefone: Yup.string().required(), 
      email: Yup.string().required(), 
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos não informados!' });
    };

    const DocumentExists = await Cliente.findOne({ where: { cpf: req.body.cpf } });
    if (DocumentExists) {
      return res.status(400).json({ error: 'Documento já Cadastrado!' });
    }

    const { id, nome, cpf, telefone, email } = await Cliente.create(req.body);
    return res.json({
      id,
      nome,
      cpf,
      telefone,
      email,
    });
  }

  async indexAll(req, res) {
    const cliente = await Cliente.findAll();

    if (!cliente) {
      res.status(404).json({ error: 'Nenhum Cliente Encontrado!' });
    }

    return res.json(cliente);
  }  


  async index(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      res.status(404).json({ error: 'Cliente não Encontrado!' });
    }

    return res.json(cliente);
  }

  async indexCPF(req, res) {
    const cliente = await Cliente.findOne({ where: { cpf: req.params.cpf } });

    if (!cliente) {
      res.status(404).json({ error: 'Cliente não Encontrado!' });
    }

    return res.json(cliente);
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      telefone: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Obrigatórios não informados' });
    };
    const { cpf } = req.body;
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(400).json({ error: 'Cliente não encontrado!' });
    }

    if (cpf && cpf != cliente.cpf) {
      const cpfExists = await Cliente.findOne({ where: { cpf } });
      if (cpfExists) {
        return res.status(400).json({ error: 'Duplicidade de Documentos (CPF)' });
      };
    }

    const clienteUpdate = await cliente.update(req.body);
    return res.json(clienteUpdate);
  }
}

export default new ClienteController();
