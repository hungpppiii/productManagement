const {
    Product,
    ProductLine,
    DistributeInformation,
    Customer,
    Order,
    WarrantyInformation,
    Factory,
    Store,
    Guarantee,
} = require('../models');
const sequelize = require('../config/db');
const ProductStatus = require('../utils/constants/ProductStatus');
const AccountRule = require('../utils/constants/AccountRule');

// @desc      get product list
// @route     [GET] /api/product/getAllProducts
// @access    Private/Factory
const getAllProduct = async (req, res) => {
    try {
        let data;
        switch (req.accountRole) {
            case AccountRule.FACTORY:
                data = await getAllProductOfFactory(req, res);
                break;
            case AccountRule.STORE:
                data = await getAllProductOfStore(req, res);
                break;
            case AccountRule.GUARANTEE:
                data = await getAllProductOfGuaranty(req, res);
                break;
            default:
                throw new Error();
        }

        res.status(200).json({
            message: 'get products successfully',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

const getAllProductOfFactory = async (req, res) => {
    try {
        const factory = await Factory.findOne({
            where: {
                accountId: req.accountId,
            },
            include: {
                model: Product,
                attributes: ['id', 'productionDate', 'status'],
                include: {
                    model: ProductLine,
                    required: true,
                    attributes: ['name', 'warrantyPeriod', 'description'],
                },
            },
        });

        if (!factory) {
            throw new Error();
        }

        return factory.Products;
    } catch (error) {
        throw new Error('error user authentication');
    }
};

const getAllProductOfStore = async (req, res) => {
    try {
        const store = await Store.findOne({
            where: {
                accountId: req.accountId,
            },
            include: {
                model: DistributeInformation,
                include: {
                    model: Product,
                    attributes: ['id', 'productionDate', 'status'],
                    include: {
                        model: ProductLine,
                        required: true,
                        attributes: ['name', 'warrantyPeriod', 'description'],
                    },
                },
            },
        });

        if (!store) {
            throw new Error();
        }

        const products = store
            .toJSON()
            .DistributeInformations.map(
                (distributeInfo) => distributeInfo.Product,
            );

        return products;
    } catch (error) {
        console.log(error);
        throw new Error('error user authentication');
    }
};

const getAllProductOfGuaranty = async (req, res) => {
    try {
        const guarantee = await Guarantee.findOne({
            where: {
                accountId: req.accountId,
            },
            include: {
                model: WarrantyInformation,
                include: {
                    model: Product,
                    attributes: ['id', 'productionDate', 'status'],
                    include: {
                        model: ProductLine,
                        required: true,
                        attributes: ['name', 'warrantyPeriod', 'description'],
                    },
                },
            },
        });

        console.log(guarantee.toJSON());

        if (!guarantee) {
            throw new Error();
        }

        const products = guarantee
            .toJSON()
            .WarrantyInformations.map((warrantyInfo) => warrantyInfo.Product);

        return products;
    } catch (error) {
        throw new Error('error user authentication');
    }
};

// @desc      get product
// @route     [GET] /api/product/:id
// @access    Private
const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'productionDate', 'status'],
            include: {
                model: ProductLine,
                required: true,
                attributes: ['name', 'warrantyPeriod', 'description'],
            },
        });

        res.status(200).json({
            message: 'get product successfully',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'get product failed',
        });
    }
};

// @desc      create new product
// @route     [POST] /api/product/create
// @access    Private/Factory
const createProduct = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { productLineId } = req.body;

        const productLine = await ProductLine.findByPk(productLineId, {
            attributes: ['id', 'name', 'warrantyPeriod', 'description'],
        });

        const newProduct = await res.locals.factory.createProduct(
            {
                status: ProductStatus.INVENTORY,
            },
            {
                transaction: t,
            },
        );

        await newProduct.setProductLine(productLine, {
            transaction: t,
        });

        const data = {
            ...newProduct.toJSON(),
            productLine,
        };

        res.status(200).json({
            message: 'create product success',
            data,
        });

        await t.commit();
    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            error: 'product creation failed',
        });
    }
};

// @desc      create new product
// @route     [PATCH] /api/product/:id
// @access    Private/Factory
const updateProduct = async (req, res) => {};

// @desc      create new product
// @route     [DELETE] /api/product/:id
// @access    Private
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({
                error: 'The product id is incorrect',
            });
        }

        const deleted = await Product.destroy({
            where: {
                id,
            },
        });

        if (deleted) {
            return res.status(200).json({
                message: 'product deletion successfully',
            });
        } else {
            return res.status(200).json({
                message: 'Product does not exist',
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 'product deletion failed',
        });
    }
};

// @desc      product distribution
// @route     [PATCH] /api/product/distributed/:id
// @access    Private/Factory
const productDistribution = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return res.status(400).json({
                error: 'The product id is incorrect',
            });
        }

        const { storeId } = req.body;

        await updateProductStatus(
            product_id,
            ProductStatus.INVENTORY,
            ProductStatus.DISTRIBUTED,
            transaction,
        )();

        const [distributeInfo, created] =
            await DistributeInformation.findOrCreate({
                where: {
                    product_id,
                    store_id: storeId,
                },
                transaction,
            });

        if (!created) {
            throw new Error('Product has been delivered');
        }

        await transaction.commit();

        return res.status(200).json({
            message: 'product distributed successfully',
            data: distributeInfo,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            error,
        });
    }
};

// @desc      sold product
// @route     [PATCH] /api/product/sold/:id
// @access    Private/Store
const soldProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return res.status(400).json({
                error: 'The product id is incorrect',
            });
        }

        const { name, address, phone } = req.body;

        await updateProductStatus(
            product_id,
            ProductStatus.DISTRIBUTED,
            ProductStatus.SOLD,
            transaction,
        )();

        const newCustomer = await Customer.findOrCreate({
            where: {
                name,
                address: address || '',
                phone: phone || '',
            },
            transaction,
        });

        const [orderInfo, created] = await Order.findOrCreate({
            where: {
                product_id,
                store_id: res.locals.store.id,
                customer_id: newCustomer[0].id,
            },
            transaction,
        });

        if (!created) {
            throw new Error('Product has been sold');
        }

        await transaction.commit();

        return res.status(200).json({
            message: 'Product sold successfully',
            data: orderInfo,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);

        return res.status(500).json({
            error,
        });
    }
};

// @desc      create new product
// @route     [PATCH] /api/product/warranty/:id
// @access    Private/Factory
const productWarranty = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return res.status(400).json({
                error: 'The product id is incorrect',
            });
        }

        const { guaranteeId } = req.body;

        await updateProductStatus(
            product_id,
            ProductStatus.SOLD,
            ProductStatus.WARRANTY,
            transaction,
        )();

        const order = await Order.findOne({
            where: {
                product_id,
            },
            attribute: ['customer_id'],
        });

        console.log('check', order.customer_id);

        const [warrantyInfo, created] = await WarrantyInformation.findOrCreate({
            where: {
                product_id,
                customer_id: order.customer_id,
                guarantee_id: guaranteeId,
            },
            transaction,
        });

        // throw new Error();

        if (!created) {
            throw new Error('Product has been warranty');
        }

        await transaction.commit();

        return res.status(200).json({
            message: 'Product sold successfully',
            data: warrantyInfo,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};

const updateProductStatus =
    (id, currentStatus, newStatus, transaction) => async () => {
        const product = await Product.findOne({
            where: {
                id,
            },
        });
        if (!product) {
            throw new Error('The product does not exist');
        }

        if (product.status === newStatus) {
            throw new Error('The product does not exist in stock');
        }

        if (product.status !== currentStatus) {
            throw new Error(`Product cannot be ${newStatus}`);
        }

        const updated = await product.update(
            {
                status: newStatus,
            },
            {
                transaction,
            },
        );

        if (!updated) {
            throw new Error(`Product cannot be ${newStatus}`);
        }
    };

module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productDistribution,
    soldProduct,
    productWarranty,
};
