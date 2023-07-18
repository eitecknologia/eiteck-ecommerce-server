module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,
        name: "ADMIN_ROLE",
      },
      {
        id: 2,
        name: "USER_ROLE",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
