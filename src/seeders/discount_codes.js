module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        discountcode: "SNEAKER12",
        discountpercent: 12.5,
        startdate: "2023-10-01",
        finishdate: "2023-10-31",
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
      },
      {
        discountcode: "NAVIDAD24",
        discountpercent: 2.5,
        startdate: "2023-01-01",
        finishdate: "2023-01-31",
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
      },
      {
        discountcode: "ZAPATOS330",
        discountpercent: 20.5,
        startdate: "2023-02-01",
        finishdate: "2023-02-31",
        status: true,
        userid: 1,
        accessrole: "ALL",
        isactive: true,
      },
    ]);
  },
};
