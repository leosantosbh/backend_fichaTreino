module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_dets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      tamanho: {
        type: Sequelize.INTEGER,
      },
      peso: {
        type: Sequelize.FLOAT,
      },
      imc: {
        type: Sequelize.FLOAT,
      },
      cidade: {
        type: Sequelize.STRING,
      },
      estado: {
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
    return queryInterface.dropTable('user_dets');
  },
};
