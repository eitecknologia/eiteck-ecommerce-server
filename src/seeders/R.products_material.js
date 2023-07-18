module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_materials", [
      {
        productVariantId: 1,
        name: "Tela",
      },
      {
        productVariantId: 1,
        name: "Cuero",
      },
      ,
      {
        productVariantId: 2,
        name: "Tela",
      },
      ,
      {
        productVariantId: 2,
        name: "Cuero",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_materials", null, {});
  }
};
