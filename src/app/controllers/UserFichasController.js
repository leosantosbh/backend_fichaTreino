import * as Yup from 'yup';
import UserFichas from '../models/UserFichas';
import Users from '../models/Users';
import Avatar from '../models/Avatar';

class UserFichasController {
  async index(req, res) {
    const fichaUser = await UserFichas.findAll({
      where: { user_id: req.userId },
      attributes: ['id','nome', 'descricao'],
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
      order: ['id'],
    });

    return res.json(fichaUser);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Favor verificar os dados informados!' });
    }

    const { nome, descricao } = req.body;

    const fichaCreated = await UserFichas.create({
      user_id: req.userId,
      nome,
      descricao,
    });

    return res.json(fichaCreated);
  }

  async update(req, res) {
    const fichaLista = await UserFichas.findByPk(req.params.id);

    const { nome, descricao } = req.body;

    await fichaLista.update({
      nome,
      descricao,
    });

    return res.json({ menssagem: 'Atualizado com sucesso.' });
  }

  async delete(req, res) {
    const fichaLista = await UserFichas.findByPk(req.params.id);

    await fichaLista.destroy();

    return res.json({ menssagem: 'Removido com sucesso.' });
  }
}

export default new UserFichasController();
