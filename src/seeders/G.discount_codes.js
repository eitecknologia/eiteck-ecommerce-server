module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("discount_codes", [
      {
        discountcode: "SNEAKER12",
        discountpercent: 12.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isActive: true,
        createdAt: new Date(),
      },
      {
        discountcode: "NAVIDAD24",
        discountpercent: 2.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isActive: true,
        createdAt: new Date(),
      },
      {
        discountcode: "ZAPATOS330",
        discountpercent: 20.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isActive: true,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  }
};
