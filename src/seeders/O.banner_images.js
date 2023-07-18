module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("brands_images", [
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689710488/eiteck/cobos_ecommerce/default/brand_h45751.jpg",
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("brands_images", null, {});
  }
};
