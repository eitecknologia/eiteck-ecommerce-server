module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories", [
      {
        name: "Hombre",
        description: "Prendas de Hombre",
        isactive: true,
      },
      {
        name: "Mujer",
        description: "Prendas de Mujer",
        isactive: true,
      },
      {
        name: "Niño",
        description: "Prendas de Niño",
        isactive: true,
      },
      {
        name: "Otro",
        description: "Ropa y Zapatos Otro",
        isactive: false,
      },
    ]);
  },
};
