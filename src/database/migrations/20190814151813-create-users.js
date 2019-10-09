module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      codigo_acesso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'avatars', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
