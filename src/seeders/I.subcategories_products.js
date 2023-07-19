module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories_products", [
      {
        subcategoryid: 1,
        productId: 1,
        timecreated: new Date(),
      },
      {
        subcategoryid: 2,
        productId: 1,
        timecreated: new Date(),
      },
      {
        subcategoryid: 1,
        productId: 2,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subcategories_products", null, {});
  }
};
