import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Users from '../models/Users';
import Avatar from '../models/Avatar';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      telefone: Yup.string().required(),
      codigo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Telefone ou Código não informado' });
    }

    const { telefone, codigo } = req.body;

    const user = await Users.findOne({
      where: { telefone },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Usuário não cadastrado, favor realizar cadastro!' });
    }

    if (!(await user.checkPassword(codigo))) {
      return res.status(401).json({ error: 'Código Inválido!' });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        telefone,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
