const {
    Product
} = require('../models')

const getProducts = async (req, res, next) => {
    res.send('Danh sách sản phẩm');
}

module.exports = {
    getProducts,
}