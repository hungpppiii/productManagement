const express = require('express');
const { productController } = require('../controllers');
const {
    verifyAccount,
    verifyFactory,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(verifyAccount, verifyFactory, productController.getProducts);

module.exports = router;
