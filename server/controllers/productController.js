const { Product } = require('../models');

// @desc      get product list
// @route     [GET] /api/factory/products
// @access    Public
const getProducts = async (req, res, next) => {
    try {
        console.log('facilityId', req.factoryId);
        res.send('Danh sách sản phẩm');
    } catch (error) {}
};

module.exports = {
    getProducts,
};
