module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ecommerce_invoice_detail", [
      {
        ci: "0604201172",
        name: "Wilmer",
        lastname: "Ronquillo",
        address: "Ambato",
        phone: "0992552366",
        email: "wilmer@email.com",
        remember: true,
        userid: 1,
      },
      {
        ci: "0604201172",
        name: "Wilmer",
        lastname: "Ronquillo",
        address: "Ambato",
        phone: "0992552366",
        email: "wilmer@email.com",
        remember: true,
        userid: 1,
      },
      {
        ci: "01056677883",
        name: "Alex",
        lastname: "Santana",
        address: "Cuenca",
        phone: "0992552366",
        email: "alex@gmail.com",
        remember: true,
        userid: 2,
      },
      {
        ci: "0105344048",
        name: "Jorge",
        lastname: "Encalada",
        address: "Cuenca Ecuador",
        phone: "0992552366",
        email: "jeeu.95@gmail.com",
        remember: true,
        userid: 5,
      },
    ]);
  },
};
