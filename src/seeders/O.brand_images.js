module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("brands_images", [
      {
        name: "Marca 1",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
      {
        name: "Marca 2",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
      {
        name: "Marca 3",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("brands_images", null, {});
  }
};
