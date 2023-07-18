module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories", [
      {
        name: "Hombre",
        description: "Prendas de Hombre",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Mujer",
        description: "Prendas de Mujer",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Niño",
        description: "Prendas de Niño",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Otro",
        description: "Ropa y Zapatos Otro",
        isActive: false,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subcategories", null, {});
  }
};
