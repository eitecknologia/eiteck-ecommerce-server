module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products_variants", [
      {
        name: "Verde Plata Suave",
        stock: 10,
        productId: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Verde Plata Fuerte",
        stock: 20,
        productId: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Azul Plata Suave",
        stock: 30,
        productId: 2,
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Azul Plata Fuerte",
        stock: 10,
        productId: 2,
        isActive: false,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products_variants", null, {});
  }
};
