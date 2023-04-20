const express = require('express');
const { productLineController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/getAllProductLine').get(productLineController.getAllProductLine);
router
    .route('/addProductLine')
    .post(verifyAdmin, productLineController.addProductLine);
router
    .route('/:id')
    .put(verifyAdmin, productLineController.editProductLine)
    .delete(verifyAdmin, productLineController.deleteProductLine);

module.exports = router;
