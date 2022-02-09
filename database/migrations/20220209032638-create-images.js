module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.createTable('images', {
      id: {
        type: STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: STRING(100),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  },
};
