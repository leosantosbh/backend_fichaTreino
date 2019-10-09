import Sequelize, { Model } from 'sequelize';

class UserFichaDetalhes extends Model {
  static init(sequelize) {
    super.init(
      {
        sequencia: Sequelize.INTEGER,
        repeticao: Sequelize.INTEGER,
        obs: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // associar detalhes ao usuário (garante que será associado)
  static associate(models) {
    this.belongsTo(models.UserFichas, {
      foreignKey: 'ficha_id',
      as: 'user_fichas',
    });
    this.belongsTo(models.Exercicios, {
      foreignKey: 'exercicio_id',
      as: 'exercicios',
    });
  }
}

export default UserFichaDetalhes;
