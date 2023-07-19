module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories_products", [
      {
        subcategoryid: 1,
        productid: 1,
        timecreated: new Date(),
      },
      {
        subcategoryid: 2,
        productid: 1,
        timecreated: new Date(),
      },
      {
        subcategoryid: 1,
        productid: 2,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subcategories_products", null, {});
  }
};
