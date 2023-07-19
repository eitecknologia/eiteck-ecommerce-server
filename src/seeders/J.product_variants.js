module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products_variants", [
      {
        name: "Verde Plata Suave",
        stock: 10,
        productId: 1,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Verde Plata Fuerte",
        stock: 20,
        productId: 1,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Azul Plata Suave",
        stock: 30,
        productId: 2,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Azul Plata Fuerte",
        stock: 10,
        productId: 2,
        isactive: false,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products_variants", null, {});
  }
};
