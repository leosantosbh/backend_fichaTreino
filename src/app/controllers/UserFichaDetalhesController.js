import * as Yup from 'yup';
import UserFichaDetalhes from '../models/UserFichaDetalhes';
import Exercicios from '../models/Exercicios';

class UserFichaDetalhesController {
  async index(req, res) {
    const { ficha_id } = req.query;

    const fichaDet = await UserFichaDetalhes.findAll({
      where: { ficha_id },
      include: [
        {
          model: Exercicios,
          as: 'exercicios',
          where: { status: true },
        },
      ],
      order: ['sequencia'],
    });
    return res.json(fichaDet);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      exercicio_id: Yup.number().required(),
      repeticao: Yup.number().required(),
      obs: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Favor verificar os dados informados!' });
    }

    const { ficha_id } = req.query;

    const fichaUserList = await UserFichaDetalhes.max('sequencia', {
      where: { ficha_id },
    });

    const sequencia = !fichaUserList ? 1 : fichaUserList + 1;

    const { exercicio_id, repeticao, obs } = req.body;

    const fichaUserCreated = await UserFichaDetalhes.create({
      ficha_id,
      exercicio_id,
      sequencia,
      repeticao,
      obs,
    });

    return res.json(fichaUserCreated);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      sequencia: Yup.number().required(),
      exercicio_id: Yup.number().required(),
      repeticao: Yup.number().required(),
      obs: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Favor verificar os dados informados!' });
    }

    const fichaDetLista = await UserFichaDetalhes.findByPk(req.params.id);

    const execdet =
      req.body.sequencia &&
      (await UserFichaDetalhes.findOne({
        where: { sequencia: req.body.sequencia, ficha_id: req.query.ficha_id },
      }));

    if (execdet) {
      await execdet.update({
        sequencia: null,
      });
    }

    await fichaDetLista.update({
      sequencia: req.body.sequencia,
      exercicio_id: req.body.exercicio_id,
      repeticao: req.body.repeticao,
      obs: req.body.obs,
    });

    return res.json({ menssagem: 'Atualizado com sucesso!' });
  }

  async delete(req, res) {
    const fichaDetLista = await UserFichaDetalhes.findByPk(req.params.id);

    await fichaDetLista.destroy();

    return res.json({ menssagem: 'Removido com sucesso.' });
  }
}

export default new UserFichaDetalhesController();
