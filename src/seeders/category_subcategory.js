module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories_subcategories", [
      {
        id: 1,
        categoryid: 1,
        subcategoryid: 1,
        timecreated: new Date(),
      },
      {
        categoryid: 1,
        subcategoryid: 2,
        timecreated: new Date(),
      },
      {
        categoryid: 2,
        subcategoryid: 1,
        timecreated: new Date(),
      },
      {
        categoryid: 2,
        subcategoryid: 2,
        timecreated: new Date(),
      },
      {
        categoryid: 2,
        subcategoryid: 3,
        timecreated: new Date(),
      },
    ]);
  },
};
