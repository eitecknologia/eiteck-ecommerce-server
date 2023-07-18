module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_sizes", [
      {
        productVariantId: 1,
        name: "5",
        unit: "Americana",
      },
      {
        productVariantId: 1,
        name: "7",
        unit: "Americana",
      },
      ,
      {
        productVariantId: 2,
        name: "M",
        unit: "cm",
      },
      ,
      {
        productVariantId: 2,
        name: "G",
        unit: "in",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_sizes", null, {});
  }
};
