module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("banner_images", [
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689635677/eiteck/cobos_ecommerce/default/kua8u7ldcafe4h2no4xc_jnsiwr.png",
      },
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689635677/eiteck/cobos_ecommerce/default/kua8u7ldcafe4h2no4xc_jnsiwr.png",
      },
      {
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689635677/eiteck/cobos_ecommerce/default/kua8u7ldcafe4h2no4xc_jnsiwr.png",
      },
    ]);
  },
};
