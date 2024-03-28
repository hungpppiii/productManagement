const express = require('express');
const { productController } = require('../controllers');
const {
    verifyFactory,
    verifyStore,
    verifyGuarantee,
} = require('../middlewares/authMiddleware');
const ProductStatus = require('../utils/constants/ProductStatus');

const router = express.Router();

router.get(
    `/${ProductStatus.DISTRIBUTED}`,
    verifyStore,
    productController.getAllProductDistributed,
);

router.get(
    `/${ProductStatus.SOLD}`,
    verifyStore,
    productController.getAllProductSold,
);

router.get(
    `/${ProductStatus.WARRANTY}`,
    verifyGuarantee,
    productController.getAllProductWarranty,
);

router
    .route('/:id')
    .get(verifyFactory, productController.getProduct)
    // .patch(verifyFactory, productController.updateProduct)
    .delete(verifyFactory, productController.deleteProduct);

router
    .route('/:id/distributed')
    .patch(verifyFactory, productController.productDistribution);

router.route('/:id/sold').patch(verifyStore, productController.soldProduct);

router
    .route('/:id/warranty')
    .patch(verifyStore, productController.productWarranty);

router
    .route('/:id/return')
    .patch(verifyGuarantee, productController.returnProductAfterWarranty);

router.get('/', verifyFactory, productController.getAllFactoryProduct);

router.post('/', verifyFactory, productController.createProduct);

module.exports = router;
