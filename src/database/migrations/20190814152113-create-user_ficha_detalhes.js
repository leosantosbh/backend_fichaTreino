module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_ficha_detalhes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ficha_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user_fichas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      exercicio_id: {
        type: Sequelize.INTEGER,
        references: { model: 'exercicios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      sequencia: {
        type: Sequelize.INTEGER,
      },
      repeticao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('user_ficha_detalhes');
  },
};
