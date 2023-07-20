// controllers/orderController.js

const Order = require('../models/orderModel');
const fs = require('fs');
const csv = require('csvtojson');

// Upload CSV file and store orders in the database
const uploadCSV = async (req, res) => {
  try {
    const orderData = [];

    const response = await csv().fromFile(req.file.path);

    for (const record of response) {
      // Validate required fields
      if (!record['Order ID'] || !record.Customer || !record['Order Date'] || !record['Item Name'] || !record.Quantity || !record['Unit Price']) {
        throw new Error('Invalid CSV data. Required fields are missing.');
      }

      orderData.push({
        orderId: record['Order ID'], 
        customerName: record.Customer,
        date: record['Order Date'], 
        product: record['Item Name'], 
        quantity: record.Quantity,
        unitPrice: record['Unit Price'], 
      });
    }

    await Order.insertMany(orderData);

    res.json({ message: 'CSV data uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while uploading CSV data.' });
  }
};
// Get all orders and their total amount
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: '$orderId',
          customerName: { $first: '$customerName' },
          totalAmount: { $sum: { $multiply: ['$quantity', '$unitPrice'] } },
        },
      },
      {
        $project: {
          _id: 0,
          orderId: '$_id',
          customerName: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};

module.exports = { uploadCSV, getAllOrders };
