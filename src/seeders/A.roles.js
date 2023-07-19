module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        roleid: 1,
        name: "ADMIN_ROLE",
      },
      {
        roleid: 2,
        name: "USER_ROLE",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
