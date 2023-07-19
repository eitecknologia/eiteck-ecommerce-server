module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_materials", [
      {
        productId: 1,
        name: "Tela",
        createdAt: new Date(),
      },
      {
        productId: 1,
        name: "Cuero",
        createdAt: new Date(),
      },
      {
        productId: 2,
        name: "Tela",
        createdAt: new Date(),
      },
      {
        productId: 2,
        name: "Cuero",
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_materials", null, {});
  },
};
