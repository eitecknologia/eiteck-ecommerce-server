module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_sizes", [
      {
        name: "5",
        unit: "Americana",
        productId: 1,
        createdAt: new Date(),
      },
      {
        name: "7",
        unit: "Americana",
        productId: 1,
        createdAt: new Date(),
      },
      {
        name: "M",
        unit: "cm",
        productId: 2,
        createdAt: new Date(),
      },
      {
        name: "G",
        unit: "in",
        productId: 2,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_sizes", null, {});
  },
};
