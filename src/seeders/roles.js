module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,
        name: "ADMIN_ROLE",
        timecreated: new Date(),
      },
      {
        name: "USER_ROLE",
      },
    ]);
  },
};
