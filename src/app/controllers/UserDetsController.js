import * as Yup from 'yup';
import Users from '../models/Users';
import UserDets from '../models/UserDets';
import UserEvolucoes from '../models/UserEvolucoes';
import Avatar from '../models/Avatar';
// import UserFichaDetalhes from '../models/UserFichaDetalhes';

class UsersController {
  async index(req, res) {
    const user = await UserDets.findByPk(req.userId, {
      attributes: ['tamanho', 'peso', 'imc', 'cidade', 'estado'],
      include: [
        {
          model: Users,
          as: 'users',
          attributes: ['id', 'nome', 'email', 'telefone'],
          include: [
            {
              model: Avatar,
              as: 'avatars',
              attributes: ['local', 'caminho'],
            },
          ],
        },
      ],
    });

    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados obrigatórios não informado' });
    }

    const { nome, email, tamanho, peso, cidade, estado } = req.body;

    const imc = (peso / (tamanho * tamanho)) * 10000;

    const user = await Users.findByPk(req.params.id);

    const userdets = await UserDets.findOne({
      where: { user_id: req.params.id },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Usuário não cadastrado!',
      });
    }

    await user.update({
      nome,
      email,
    });

    await userdets.update({
      tamanho,
      peso,
      imc,
      cidade,
      estado,
    });

    await UserEvolucoes.create({
      user_id: req.params.id,
      tamanho,
      peso,
      imc,
      data_criacao: new Date(),
    });

    return res.json({ Message: 'Dados Atualizados com sucesso!' });
  }
}

export default new UsersController();
