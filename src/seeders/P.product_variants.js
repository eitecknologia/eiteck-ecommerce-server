module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products_variants", [
      {
        stock: 10,
        productId: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        stock: 20,
        productId: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        stock: 30,
        productId: 2,
        isActive: true,
        createdAt: new Date(),
      },
      {
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
