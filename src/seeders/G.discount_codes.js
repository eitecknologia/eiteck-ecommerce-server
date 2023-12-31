module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("discount_codes", [
      {
        id: 1,
        discountcode: "SNEAKER12",
        discountpercent: 12.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 2,
        discountcode: "NAVIDAD24",
        discountpercent: 2.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
        timecreated: new Date(),
      },
      {
        id: 3,
        discountcode: "ZAPATOS330",
        discountpercent: 20.5,
        startdate: new Date(),
        finishdate: new Date(),
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  }
};
