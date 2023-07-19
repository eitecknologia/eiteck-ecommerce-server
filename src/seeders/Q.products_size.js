module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_sizes", [
      {
        name: "5",
        unit: "Americana",
        productid: 1,
        timecreated: new Date(),
      },
      {
        name: "7",
        unit: "Americana",
        productid: 1,
        timecreated: new Date(),
      },
      {
        name: "M",
        unit: "cm",
        productid: 2,
        timecreated: new Date(),
      },
      {
        name: "G",
        unit: "in",
        productid: 2,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_sizes", null, {});
  },
};
