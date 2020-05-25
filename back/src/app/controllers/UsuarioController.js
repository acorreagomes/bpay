import * as Yup from 'yup';
import Usuario from '../models/Usuarios';
import PerfilUsuario from '../models/PerfilUsuario';

class UsuarioController {

  async store(req, res) {

    const schema = Yup.object().shape({
      id_perfil_usuario: Yup.number().required(),
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const emailExists = await Usuario.findOne({ where: { email: req.body.email } });
    if (emailExists) {
      return res.status(200).json({ error: 'Este email já está sendo usado!' });
    }

    const perfilUsuario = await PerfilUsuario.findByPk(req.body.id_perfil_usuario);
    if (!perfilUsuario) {
      return res.status(200).json({ error: 'Perfil de Usuário não encontrado!' });
    }

    const { id, id_perfil_usuario, nome, email, admin } = await Usuario.create(req.body);
    return res.json({
      id,
      id_perfil_usuario,
      nome,
      email,
      admin
    });
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      senha_antiga: Yup.string().min(6),
      senha: Yup.string().min(6)
        .when('senha_antiga', (senha_antiga, field) =>
          senha_antiga ? field.required() : field),
      confirma_senha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };
    const { email, senha_antiga } = req.body;
    const usuario = await Usuario.findByPk(req.userId);

    if (email && email != usuario.email) {
      const emailExists = await Usuario.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Duplicidade de Emails' });
      };
    }
    if (senha_antiga && !(await usuario.checkPassword(senha_antiga))) {
      return res.status(400).json({ error: 'Senhas não são Iguais' });
    }
    const { id, nome } = await usuario.update(req.body);
    return res.json({ id, nome, email });
  }
}

export default new UsuarioController();
