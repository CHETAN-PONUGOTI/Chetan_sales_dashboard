const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  type: { type: String, enum: ['Individual', 'Business'], required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);