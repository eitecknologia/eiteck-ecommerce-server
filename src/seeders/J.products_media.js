module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_media", [
      {
        id: 1,
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        productid: 1,
      },
      {
        id: 2,
        type: "video",
        url: "https://res.cloudinary.com/db6g5aoec/video/upload/v1689636299/eiteck/cobos_ecommerce/default/production_id_3804690_1080p_lbecoo.mp4",
        productid: 1,
      },
      {
        id: 3,
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        productid: 2,
      },
      {
        id: 4,
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        productid: 2,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_media", null, {});
  }
};
