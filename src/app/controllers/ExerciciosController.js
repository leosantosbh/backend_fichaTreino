import * as Yup from 'yup';
import Exercicios from '../models/Exercicios';
import AvatarExercicios from '../models/AvatarExercicios';

class ExerciciosController {
  async index(req, res) {
    const exerciciosLista = await Exercicios.findAll({
      include: [
        {
          model: AvatarExercicios,
          as: 'avatar_exercicios',
          attributes: ['local', 'caminho'],
        },
      ],
    });

    return res.json(exerciciosLista);
  }

  async delete(req, res) {
    const exerciciosLista = await Exercicios.findByPk(req.params.id);

    await exerciciosLista.destroy();

    return res.json({ menssagem: 'Removido com sucesso.' });
  }

  async update(req, res) {
    const exerciciosLista = await Exercicios.findByPk(req.params.id);

    const { nome, descricao, tipo, status, avatar_exec_id } = req.body;

    await exerciciosLista.update({
      nome,
      descricao,
      tipo,
      status,
      avatar_exec_id,
    });

    return res.json({ menssagem: 'Atualizado com sucesso.' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      tipo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados informados.' });
    }

    const { nome, descricao, tipo, avatar_exec_id } = req.body;

    const exercicio = await Exercicios.findOne({
      where: { nome },
    });

    if (exercicio) {
      return res.status(401).json({
        error: 'Exercício já cadastrado.',
      });
    }

    const execicioCreated = await Exercicios.create({
      nome,
      descricao,
      tipo,
      avatar_exec_id,
    });

    return res.json(execicioCreated);
  }
}

export default new ExerciciosController();
