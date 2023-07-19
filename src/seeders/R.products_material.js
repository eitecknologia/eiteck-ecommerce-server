module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_materials", [
      {
        productId: 1,
        name: "Tela",
        timecreated: new Date(),
      },
      {
        productId: 1,
        name: "Cuero",
        timecreated: new Date(),
      },
      {
        productId: 2,
        name: "Tela",
        timecreated: new Date(),
      },
      {
        productId: 2,
        name: "Cuero",
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_materials", null, {});
  },
};
