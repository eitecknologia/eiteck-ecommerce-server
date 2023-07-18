module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("sale_products", [
      {
        saleid: 1,
        productid: 1,
        quantity: 2,
        createdAt: new Date(),
      },
      {
        saleid: 1,
        productid: 2,
        quantity: 4,
        createdAt: new Date(),
      },
      {
        saleid: 2,
        productid: 1,
        quantity: 1,
        createdAt: new Date(),
      },
      {
        saleid: 1,
        productid: 2,
        quantity: 0.5,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sale_products", null, {});
  }
};
