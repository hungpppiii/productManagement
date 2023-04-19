const express = require('express');
const { productLineController } = require('../controllers');
const { verifyAccount, verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/getAllProductLine')
    .get(verifyAccount, productLineController.getAllProductLine);
router
    .route('/addProductLine')
    .post(verifyAccount, verifyAdmin, productLineController.addProductLine);
router
    .route('/:id')
    .put(verifyAccount, verifyAdmin, productLineController.editProductLine)
    .delete(
        verifyAccount,
        verifyAdmin,
        productLineController.deleteProductLine,
    );

module.exports = router;
