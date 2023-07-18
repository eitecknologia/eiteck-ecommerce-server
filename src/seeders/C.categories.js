module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Casual",
        description: "Ropa y Zapatos Casual",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 2,
        name: "Deportivo",
        description: "Ropa y Zapatos Deportivos",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 3,
        name: "Bota",
        description: "Ropa y Zapatos Bota",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 4,
        name: "Otro",
        description: "Ropa y Zapatos Otro",
        isactive: false,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
