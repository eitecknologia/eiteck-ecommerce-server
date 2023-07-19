module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product_media", [
      {
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        default: true,
        productVariantId: 1,
        timecreated: new Date(),
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/db6g5aoec/video/upload/v1689636299/eiteck/cobos_ecommerce/default/production_id_3804690_1080p_lbecoo.mp4",
        default: false,
        productVariantId: 1,
        timecreated: new Date(),
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        default: true,
        productVariantId: 2,
        timecreated: new Date(),
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689636098/eiteck/cobos_ecommerce/default/zapato_wyiwsc.webp",
        default: false,
        productVariantId: 2,
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_media", null, {});
  }
};
