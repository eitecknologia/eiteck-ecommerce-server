module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories_products", [
      {
        id: 1,
        subcategoryid: 1,
        productid: 1,
        timecreated: new Date(),
      },
      {
        id: 2,
        subcategoryid: 2,
        productid: 1,
        timecreated: new Date(),
      },
      {
        id: 3,
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
