const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  quantity: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  saleDate: { type: Date, required: true },
});

module.exports = mongoose.model('Sale', SaleSchema);