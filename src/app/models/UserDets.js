import Sequelize, { Model } from 'sequelize';

class UserDets extends Model {
  static init(sequelize) {
    super.init(
      {
        tamanho: Sequelize.FLOAT,
        peso: Sequelize.FLOAT,
        imc: Sequelize.FLOAT,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
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

export default UserDets;
