const express = require('express');
const { productLineController } = require('../controllers');
const { verifyAccount } = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/getAllProductLine')
    .get(verifyAccount, productLineController.getAllProductLine);
router
    .route('/addProductLine')
    .post(verifyAccount, productLineController.addProductLine);
router
    .route('/:id')
    .put(verifyAccount, productLineController.editProductLine)
    .delete(verifyAccount, productLineController.deleteProductLine);

module.exports = router;
