module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("sale_products", [
      {
        id: 1,
        saleid: 1,
        productid: 1,
        quantity: 2,
        timecreated: new Date(),
      },
      {
        id: 2,
        saleid: 1,
        productid: 2,
        quantity: 4,
        timecreated: new Date(),
      },
      {
        id: 3,
        saleid: 2,
        productid: 1,
        quantity: 1,
        timecreated: new Date(),
      },
      {
        id: 4,
        saleid: 1,
        productid: 2,
        quantity: 0.5,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sale_products", null, {});
  }
};
