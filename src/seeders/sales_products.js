module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("sale_product", [
      {
        id: 1,
        saleid: 1,
        productid: 1,
        quantity: 2,
      },
      {
        saleid: 1,
        productid: 2,
        quantity: 4,
      },
      {
        saleid: 2,
        productid: 1,
        quantity: 1,
      },
      {
        saleid: 1,
        productid: 2,
        quantity: 0.5,
      },
    ]);
  },
};
