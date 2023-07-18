module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories", [
      {
        id: 1,
        name: "Hombre",
        description: "Prendas de Hombre",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 2,
        name: "Mujer",
        description: "Prendas de Mujer",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 3,
        name: "Niño",
        description: "Prendas de Niño",
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
    return queryInterface.bulkDelete("subcategories", null, {});
  }
};
