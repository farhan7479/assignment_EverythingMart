const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const orderController = require('../controllers/orderController.js');

router.use(express.static(path.resolve(__dirname, 'public')));
router.use(express.json());

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload CSV file and store orders in the database
router.post('/upload', upload.single('file'), orderController.uploadCSV);

// Get all orders and their total amount
router.get('/orders', orderController.getAllOrders);

module.exports = router;
