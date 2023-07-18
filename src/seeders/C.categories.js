module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Casual",
        description: "Ropa y Zapatos Casual",
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Deportivo",
        description: "Ropa y Zapatos Deportivos",
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Bota",
        description: "Ropa y Zapatos Bota",
        isactive: true,
        timecreated: new Date(),
      },
      {
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
