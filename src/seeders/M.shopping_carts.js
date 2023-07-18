module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("shopping_carts", [
      {
        id: 1,
        userid: 1,
        productid: 1,
        quantity: 2,
        timecreated: new Date(),
      },
      {
        id: 2,
        userid: 1,
        productid: 2,
        quantity: 4,
        timecreated: new Date(),
      },
      {
        id: 3,
        userid: 2,
        productid: 1,
        quantity: 1,
        timecreated: new Date(),
      },
      {
        id: 4,
        userid: 2,
        productid: 2,
        quantity: 0.5,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("shopping_carts", null, {});
  }
};
