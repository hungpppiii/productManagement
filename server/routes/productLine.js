const express = require('express');
const { productLineController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/getAllProductLine').get(productLineController.getAllProductLine);
router
    .route('/create')
    .post(verifyAdmin, productLineController.createProductLine);
router
    .route('/:id')
    .patch(verifyAdmin, productLineController.updateProductLine)
    .delete(verifyAdmin, productLineController.deleteProductLine);

module.exports = router;
