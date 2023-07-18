module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        ci: "0604201178",
        name: "Cristhian",
        lastname: "Guadalupe",
        address: "Riobamba Ecuador",
        email: "cristhianalejandroguadalupe@gmail.com",
        password:
          "$2b$10$DuwM./jOhBBvzWjNkSRgz.olPuJ8GdnuKwtte9URTTBK4xNGhYBDW",
        isactive: true,
        phone: "0992663322",
        google: false,
        facebook: false,
        roleid: 1,
      },
      {
        ci: "01056677883",
        name: "Alejandro2",
        lastname: "Morales2",
        address: "Cuenca Ecuador",
        email: "alejanrotest2@test.com",
        password:
          "$2b$10$an2MkonUdWmEZD3Qu4IO.uPg2sbpZMKut9pEODlClFY/zt9PyHK0q",
        isactive: true,
        phone: "09663663266",
        google: false,
        facebook: false,
        roleid: 2,
      },
      {
        ci: "0105344048",
        name: "Jorge",
        lastname: "Encalada",
        address: "Cuenca",
        email: "jeeu.95@gmail.com",
        password:
          "$2b$10$jeWIJTdDyJG9dc4pY.7KROOiCqNZfkLU4KkFExHy6QPsSOcgn8r2y",
        isactive: true,
        phone: "0992574014",
        google: false,
        facebook: false,
        roleid: 2,
      },
    ]);
  },
};
