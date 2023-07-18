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
        id: 2,
        categoryid: 1,
        subcategoryid: 2,
        timecreated: new Date(),
      },
      {
        id: 3,
        categoryid: 2,
        subcategoryid: 1,
        timecreated: new Date(),
      },
      {
        id: 4,
        categoryid: 2,
        subcategoryid: 2,
        timecreated: new Date(),
      },
      {
        id: 5,
        categoryid: 2,
        subcategoryid: 3,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories_subcategories", null, {});
  }
};
