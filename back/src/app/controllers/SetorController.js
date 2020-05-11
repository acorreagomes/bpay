import * as Yup from 'yup';
import Setor from '../models/Setores';
import Evento from '../models/Eventos';
import Produtor from '../models/Produtores';

class SetorController {

  async store(req, res) {

    const schema = Yup.object().shape({
      id_evento: Yup.number().required(),
      nome_setor: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const evento = await Evento.findByPk(req.body.id_evento);
    if (!evento) {
      return res.status(200).json({ error: 'Evento não Encontrado' });
    }

    if (!evento.liberado) {
      return res.status(200).json({ error: 'Evento não Liberado' });
    }

    const produtor = await Produtor.findByPk(evento.id_produtor);

    if (!produtor) {
      return res.status(200).json({ error: 'Produtor não Encontrado' });
    }

    if (produtor.bloqueado) {
      return res.status(200).json({ error: 'Produtor Bloqueado' });
    }
    const setor = await Setor.create(req.body);
    return res.json(setor);
  }

  async setoresEvento(req, res) {
    const evento = await Evento.findByPk(req.params.id_evento);
    if (!evento) {
      return res.status(200).json({ error: 'Evento não Encontrado' });
    }

    if (!evento.liberado) {
      return res.status(200).json({ error: 'Evento não Liberado' });
    }

    const setores = await Setor.findAll({
      where: { id_evento: evento.id },
      attributes: ['id', 'nome_setor']
    });
    if (!setores) {
      return res.status(200).json({ error: 'Nenhum Setor cadastrado para esse Evento' });
    };

    return res.json(setores);
  }

}

export default new SetorController();
