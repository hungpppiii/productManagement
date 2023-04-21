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
    `/getAllProducts/${ProductStatus.INVENTORY}`,
    verifyFactory,
    productController.getAllProductInventory,
);
router.get(
    `/getAllProducts/${ProductStatus.ERROR}`,
    verifyFactory,
    productController.getAllProductError,
);

router.get(
    `/getAllProducts/${ProductStatus.DISTRIBUTED}`,
    verifyStore,
    productController.getAllProductDistributed,
);
router.get(
    `/getAllProducts/${ProductStatus.SOLD}`,
    verifyStore,
    productController.getAllProductSold,
);

router.get(
    `/getAllProducts/${ProductStatus.WARRANTY}`,
    verifyGuarantee,
    productController.getAllProductWarranty,
);

router
    .route('/:id')
    .get(verifyFactory, productController.getProduct)
    // .patch(verifyFactory, productController.updateProduct)
    .delete(verifyFactory, productController.deleteProduct);

router
    .route('/distributed/:id')
    .patch(verifyFactory, productController.productDistribution);

router.route('/sold/:id').patch(verifyStore, productController.soldProduct);

router
    .route('/warranty/:id')
    .patch(verifyStore, productController.productWarranty);

router
    .route('/return/:id')
    .patch(verifyGuarantee, productController.returnProductAfterWarranty);

router.post('/create', verifyFactory, productController.createProduct);

module.exports = router;
