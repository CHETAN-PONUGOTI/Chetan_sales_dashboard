const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDB = require('./config/db');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Sale = require('./models/Sale');

// Connect to DB
connectDB();

const regions = ['North', 'South', 'East', 'West', 'Central'];
const customerTypes = ['Individual', 'Business'];
const productCategories = ['Electronics', 'Books', 'Clothing', 'Home Goods', 'Sports'];

const seedData = async () => {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Sale.deleteMany({});
    console.log('Data Cleared!');

    // Seed Customers
    const customers = [];
    for (let i = 0; i < 50; i++) {
      customers.push({
        name: faker.person.fullName(),
        region: faker.helpers.arrayElement(regions),
        type: faker.helpers.arrayElement(customerTypes),
      });
    }
    const createdCustomers = await Customer.insertMany(customers);
    console.log('Customers Seeded!');

    // Seed Products
    const products = [];
    for (let i = 0; i < 30; i++) {
      products.push({
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(productCategories),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      });
    }
    const createdProducts = await Product.insertMany(products);
    console.log('Products Seeded!');

    // Seed Sales (for the last 2 years)
    const sales = [];
    for (let i = 0; i < 500; i++) {
      const product = faker.helpers.arrayElement(createdProducts);
      const customer = faker.helpers.arrayElement(createdCustomers);
      const quantity = faker.number.int({ min: 1, max: 10 });

      sales.push({
        productId: product._id,
        customerId: customer._id,
        quantity: quantity,
        totalRevenue: quantity * product.price,
        saleDate: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2025-09-20T00:00:00.000Z' }),
      });
    }
    await Sale.insertMany(sales);
    console.log('Sales Seeded!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();