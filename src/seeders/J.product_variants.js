module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products_variants", [
      {
        name: "Verde Planta Suave",
        stock: 10,
        productid: 1,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Verde Planta Fuerte",
        stock: 20,
        productid: 2,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Azul Planta Suave",
        stock: 30,
        productid: 1,
        isactive: true,
        timecreated: new Date(),
      },
      {
        name: "Azul Planta Fuerte",
        stock: 10,
        productid: 2,
        isactive: false,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products_variants", null, {});
  }
};
