const express = require('express');
const { productController } = require('../controllers');
const {
    verifyAccount,
    verifyFactory,
    verifyStore,
    verifyGuarantee,
} = require('../middlewares/authMiddleware');
const ProductStatus = require('../utils/constants/ProductStatus');

const router = express.Router();

router.get('/getAllProducts', verifyAccount, productController.getAllProduct);

router
    .route('/:id')
    .get(verifyAccount, verifyFactory, productController.getProduct)
    .patch(verifyAccount, verifyFactory, productController.updateProduct)
    .delete(verifyAccount, verifyFactory, productController.deleteProduct);

router
    .route('/distributed/:id')
    .patch(verifyAccount, verifyFactory, productController.productDistribution);
router
    .route('/sold/:id')
    .patch(verifyAccount, verifyStore, productController.soldProduct);
router
    .route('/warranty/:id')
    .patch(verifyAccount, verifyStore, productController.productWarranty);
router.post(
    '/create',
    verifyAccount,
    verifyFactory,
    productController.createProduct,
);

module.exports = router;
