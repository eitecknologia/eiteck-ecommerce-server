module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("sale_products", [
      {
        saleid: 1,
        prodvarid: 1,
        quantity: 2,
        timecreated: new Date(),
      },
      {
        saleid: 1,
        prodvarid: 2,
        quantity: 4,
        timecreated: new Date(),
      },
      {
        saleid: 2,
        prodvarid: 1,
        quantity: 1,
        timecreated: new Date(),
      },
      {
        saleid: 1,
        prodvarid: 2,
        quantity: 0.5,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sale_products", null, {});
  }
};
