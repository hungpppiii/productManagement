const express = require('express');
const { factoryController } = require('../controllers');

const router = express.Router();

router.route('/products').get(factoryController.getProducts);

module.exports = router;
