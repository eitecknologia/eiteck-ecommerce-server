module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("sales", [
      {
        status: "RESERVADO",
        userid: 2,
        invoiceid: 1,
        discountcodeid: null,
        paymentresource: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689700029/eiteck/cobos_ecommerce/default/comprobante_oaf5w6.jpg",
        observation: "Observacion 1",
        subtotal: 100,
        iva: 12,
        totalsale: 112,
        saledate: new Date(),
        timecreated: new Date(),
      },
      {
        status: "PENDIENTE",
        userid: 2,
        invoiceid: 1,
        discountcodeid: null,
        paymentresource: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689700029/eiteck/cobos_ecommerce/default/comprobante_oaf5w6.jpg",
        observation: "Observacion 2",
        subtotal: 100,
        iva: 12,
        totalsale: 112,
        saledate: new Date(),
        timecreated: new Date(),
      },
      {
        status: "RECHAZADO",
        userid: 2,
        invoiceid: 2,
        discountcodeid: null,
        paymentresource: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689700029/eiteck/cobos_ecommerce/default/comprobante_oaf5w6.jpg",
        observation: "Observacion 2",
        subtotal: 100,
        iva: 12,
        totalsale: 112,
        saledate: new Date(),
        timecreated: new Date(),
      },
      {
        status: "PAGADO",
        userid: 2,
        invoiceid: 2,
        discountcodeid: 1,
        paymentresource: "https://res.cloudinary.com/db6g5aoec/image/upload/v1689700029/eiteck/cobos_ecommerce/default/comprobante_oaf5w6.jpg",
        observation: "Observacion 4",
        subtotal: 100,
        iva: 12,
        totalsale: 112,
        saledate: new Date(),
        timecreated: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sales", null, {});
  }
};
