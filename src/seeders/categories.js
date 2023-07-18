module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ecommerce_categories', [{
      name: 'Casual',
      description: 'Ropa y Zapatos Casual',
      isactive: true,
    },
    {
      name: 'Deportivo',
      description: 'Ropa y Zapatos Deportivos',
      isactive: true,
    },
    {
      name: 'Bota',
      description: 'Ropa y Zapatos Bota',
      isactive: true,
    },
    {
      name: 'Otro',
      description: 'Ropa y Zapatos Otro',
      isactive: false,
    }
  ]);
  }
};