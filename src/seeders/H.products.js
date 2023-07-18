module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        name: "Zapatos Nike Hoops",
        description: "Zapatos Nike Hoops con suela de goma",
        price: 50,
        stock: 10,
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Zapatos Adidas Mamba",
        description: "Zapatos Adidas Mamba con suela de goma",
        price: 100,
        stock: 100,
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Zapatos Skechers Air",
        description: "Zapatos Skechers Air con suela de goma",
        price: 20.1,
        stock: 0,
        isactive: true,
        createdAt: new Date(),
      },
      {
        name: "Zapatos Nike Dunk",
        description: "Zapatos Nike Dunk con suela de goma",
        price: 20.3,
        stock: 1,
        isactive: false,
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  }
};
