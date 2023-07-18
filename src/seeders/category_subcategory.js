module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories_subcategories", [
      {
        categoryid: 1,
        subcategoryid: 1,
      },
      {
        categoryid: 1,
        subcategoryid: 2,
      },
      {
        categoryid: 2,
        subcategoryid: 1,
      },
      {
        categoryid: 2,
        subcategoryid: 2,
      },
      {
        categoryid: 2,
        subcategoryid: 3,
      },
    ]);
  },
};
