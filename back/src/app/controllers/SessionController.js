import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Usuario from '../models/Usuarios';
import PerfilUsuario from '../models/PerfilUsuario';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de Validação' });
    };

    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(200).json({ error: 'Usuário não encontrado' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(200).json({ error: 'Senha incorreta' });
    }

    const { id, nome } = usuario;
    //const perfil = await PerfilUsuario.findOne({ where: { id: usuario.id_perfil_usuario } });


    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
    });
  }
}

export default new SessionController();
