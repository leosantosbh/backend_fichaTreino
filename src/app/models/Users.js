import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        codigo: Sequelize.VIRTUAL,
        codigo_acesso: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.codigo) {
        user.codigo_acesso = await bcrypt.hash(`a${user.codigo}`, 8);
      }
    });

    return this;
  }

  // associar um usuário ao avatar (garante que será associado)
  static associate(models) {
    this.belongsTo(models.Avatar, { foreignKey: 'avatar_id', as: 'avatars' });
  }

  checkPassword(codigo) {
    return bcrypt.compare(`a${codigo}`, this.codigo_acesso);
  }
}

export default Users;
