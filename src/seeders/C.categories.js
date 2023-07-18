module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Casual",
        description: "Ropa y Zapatos Casual",
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Deportivo",
        description: "Ropa y Zapatos Deportivos",
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Bota",
        description: "Ropa y Zapatos Bota",
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Otro",
        description: "Ropa y Zapatos Otro",
        isactive: false,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
