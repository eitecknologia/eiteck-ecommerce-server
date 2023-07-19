module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories", [
      {
        name: "Hombre",
        description: "Prendas de Hombre",
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Mujer",
        description: "Prendas de Mujer",
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Niño",
        description: "Prendas de Niño",
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
    return queryInterface.bulkDelete("subcategories", null, {});
  }
};
