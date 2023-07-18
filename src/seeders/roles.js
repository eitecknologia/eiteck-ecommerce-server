module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ecommerce_roles', [{
      roleid: 1,
      name: 'ADMIN_ROLE'
    }, {
      roleid: 2,
      name: 'USER_ROLE'
    }]);
  }
};