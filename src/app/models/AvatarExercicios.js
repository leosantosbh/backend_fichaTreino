import Sequelize, { Model } from 'sequelize';

class AvatarExercicios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        local: Sequelize.STRING,
        caminho: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/avatarexercicios/${this.local}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default AvatarExercicios;
