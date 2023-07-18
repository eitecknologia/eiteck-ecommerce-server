module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("invoice_details", [
      {
        id: 1,
        ci: "0604201172",
        name: "Wilmer",
        lastname: "Ronquillo",
        address: "Ambato",
        phone: "0992552366",
        email: "wilmer@email.com",
        remember: true,
        userid: 1,
        timecreated: new Date(), 
      },
      {
        id: 2,
        ci: "0604201172",
        name: "Wilmer",
        lastname: "Ronquillo",
        address: "Ambato",
        phone: "0992552366",
        email: "wilmer@email.com",
        remember: true,
        userid: 1,
        timecreated: new Date(),
      },
      {
        id: 3,
        ci: "01056677883",
        name: "Alex",
        lastname: "Santana",
        address: "Cuenca",
        phone: "0992552366",
        email: "alex@gmail.com",
        remember: true,
        userid: 2,
        timecreated: new Date(),
      },
      {
        id: 4,
        ci: "0105344048",
        name: "Jorge",
        lastname: "Encalada",
        address: "Cuenca Ecuador",
        phone: "0992552366",
        email: "jeeu.95@gmail.com",
        remember: true,
        userid: 3,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("invoice_details", null, {});
  }
};
