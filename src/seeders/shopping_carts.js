module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("shopping_cart", [
      {
        id: 1,
        userid: 1,
        productid: 1,
        quantity: 2,
      },
      {
        userid: 1,
        productid: 2,
        quantity: 4,
      },
      {
        userid: 2,
        productid: 1,
        quantity: 1,
      },
      {
        userid: 2,
        productid: 2,
        quantity: 0.5,
      },
    ]);
  },
};
