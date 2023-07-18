module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("subcategories_products", [
      {
        subcategoryid: 1,
        productid: 1,
      },
      {
        subcategoryid: 2,
        productid: 1,
      },
      {
        subcategoryid: 1,
        productid: 2,
      },
    ]);
  },
};