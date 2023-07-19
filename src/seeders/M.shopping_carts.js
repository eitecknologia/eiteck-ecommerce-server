module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("shopping_carts", [
      {
        userid: 1,
        prodvarid: 1,
        quantity: 2,
        timecreated: new Date(),
      },
      {
        userid: 1,
        prodvarid: 2,
        quantity: 4,
        timecreated: new Date(),
      },
      {
        userid: 2,
        prodvarid: 1,
        quantity: 1,
        timecreated: new Date(),
      },
      {
        userid: 2,
        prodvarid: 2,
        quantity: 0.5,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("shopping_carts", null, {});
  }
};
