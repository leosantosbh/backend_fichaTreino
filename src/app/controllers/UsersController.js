import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import Users from '../models/Users';
import Avatar from '../models/Avatar';
import UserDets from '../models/UserDets';
import UserFichas from '../models/UserFichas';

class UsersController {
  async index(req, res) {
    const user = await Users.findOne({
      where: { id: req.userId },
      attributes: ['nome', 'email', 'telefone', 'avatar_id'],
      include: [
        {
          model: Avatar,
          as: 'avatars',
          attributes: ['id', 'local', 'caminho'],
        },
      ],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      telefone: Yup.string()
        .required()
        .min(14),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Informe o número de telefone!' });
    }

    const { telefone } = req.body;

    const user = await Users.findOne({
      where: { telefone },
    });

    if (user) {
      return res.status(401).json({
        error: 'Usuário já cadastrado, favor solicitar novo código de acesso!',
      });
    }

    const code_randon = Math.random() * (100000 - 999999) + 999999;
    const codigo = Math.floor(code_randon);
    const codigo_acesso = await bcrypt.hash(`a${codigo}`, 8);

    await Users.create({
      nome: '',
      email: '',
      telefone,
      codigo_acesso,
    });

    const userCreated = await Users.findOne({
      where: { telefone },
    });

    await UserDets.create({
      user_id: userCreated.id,
    });

    await UserFichas.create({
      user_id: userCreated.id,
      nome: 'Ficha 01',
      descricao: 'Criado Ficha 01 de Treino',
    });

    return res.json({ telefone, codigo });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      telefone: Yup.string()
        .required()
        .min(14),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Informe o número de telefone!' });
    }

    const { telefone } = req.body;

    const user = await Users.findOne({
      where: { telefone },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Usuário não cadastrado!',
      });
    }

    const code_randon = Math.random() * (100000 - 999999) + 999999;
    const codigo = Math.floor(code_randon);
    const codigo_acesso = await bcrypt.hash(`a${codigo}`, 8);

    await user.update({
      codigo_acesso,
    });

    return res.json({ telefone, codigo });
  }
}

export default new UsersController();
