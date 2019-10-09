import Sequelize, { Model } from 'sequelize';

class UserFichas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
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

export default UserFichas;
