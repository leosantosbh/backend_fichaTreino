import Sequelize, { Model } from 'sequelize';

class Exercicios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        tipo: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // associar um usuário ao avatar (garante que será associado)
  static associate(models) {
    this.belongsTo(models.AvatarExercicios, {
      foreignKey: 'avatar_exec_id',
      as: 'avatar_exercicios',
    });
  }
}

export default Exercicios;
