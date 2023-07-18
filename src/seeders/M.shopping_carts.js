module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("shopping_carts", [
      {
        userid: 1,
        productVariantId: 1,
        quantity: 2,
        createdAt: new Date(),
      },
      {
        userid: 1,
        productVariantId: 2,
        quantity: 4,
        createdAt: new Date(),
      },
      {
        userid: 2,
        productVariantId: 1,
        quantity: 1,
        createdAt: new Date(),
      },
      {
        userid: 2,
        productVariantId: 2,
        quantity: 0.5,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("shopping_carts", null, {});
  }
};
