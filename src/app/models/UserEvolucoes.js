import Sequelize, { Model } from 'sequelize';

class UserEvolucoes extends Model {
  static init(sequelize) {
    super.init(
      {
        tamanho: Sequelize.FLOAT,
        peso: Sequelize.FLOAT,
        imc: Sequelize.FLOAT,
        data_criacao: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // associar detalhes ao usuário (garante que será associado)
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'users' });
  }
}

export default UserEvolucoes;
