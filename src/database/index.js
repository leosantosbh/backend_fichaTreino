import Sequelize from 'sequelize';

import Avatar from '../app/models/Avatar';
import Users from '../app/models/Users';
import UserDets from '../app/models/UserDets';
import UserEvolucoes from '../app/models/UserEvolucoes';

import UserFichas from '../app/models/UserFichas';
import UserFichaDetalhes from '../app/models/UserFichaDetalhes';

import AvatarExercicios from '../app/models/AvatarExercicios';
import Exercicios from '../app/models/Exercicios';

import databaseConfig from '../config/database';

const models = [
  Avatar,
  Users,
  UserDets,
  UserEvolucoes,
  UserFichas,
  UserFichaDetalhes,
  AvatarExercicios,
  Exercicios,
];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
