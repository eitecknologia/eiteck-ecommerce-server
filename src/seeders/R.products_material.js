module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_materials", [
      {
        productVariantId: 1,
        name: "Tela",
        createdAt: new Date(),
      },
      {
        productVariantId: 1,
        name: "Cuero",
        createdAt: new Date(),
      },
      {
        productVariantId: 2,
        name: "Tela",
        createdAt: new Date(),
      },
      {
        productVariantId: 2,
        name: "Cuero",
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_materials", null, {});
  },
};
