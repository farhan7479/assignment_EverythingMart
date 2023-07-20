

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
