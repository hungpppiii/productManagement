const {
    Product,
    ProductLine,
    DistributeInformation,
    Customer,
    Order,
    WarrantyInformation,
    Factory,
} = require('../models');
const sequelize = require('../config/db');
const ProductStatus = require('../utils/constants/ProductStatus');

// @desc      get product list inventory
// @route     [GET] /api/product/getAllProducts/inventory
// @access    Private/Factory
const getAllProductInventory = async (req, res, next) => {
    try {
        const factory = res.locals.factory;

        const products = await factory.getProducts({
            where: {
                status: ProductStatus.INVENTORY,
            },
            attributes: ['id', 'productionDate', 'status'],
            include: {
                model: ProductLine,
                required: true,
                attributes: ['name', 'warrantyPeriod', 'description'],
            },
            required: true,
        });

        if (!products) {
            return next({
                message: `No products found for factory - '${factory.id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product list error
// @route     [GET] /api/product/getAllProducts/error
// @access    Private/Factory
const getAllProductError = async (req, res, next) => {
    try {
        const factory = res.locals.factory;

        const products = await factory.getProducts({
            where: {
                status: ProductStatus.ERROR,
            },
            attributes: ['id', 'productionDate', 'status'],
            include: {
                model: ProductLine,
                required: true,
                attributes: ['name', 'warrantyPeriod', 'description'],
            },
            required: true,
        });

        if (!products) {
            return next({
                message: `No products found for factory - '${factory.id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product list distributed
// @route     [GET] /api/product/getAllProducts/distributed
// @access    Private/Store
const getAllProductDistributed = async (req, res, next) => {
    try {
        const store = res.locals.store;

        const distributeInformations = await store.getDistributeInformations({
            attributes: ['distributionDate'],
            include: {
                model: Product,
                where: {
                    status: ProductStatus.DISTRIBUTED,
                },
                attributes: ['id', 'productionDate', 'status'],
                include: {
                    model: ProductLine,
                    required: true,
                    attributes: [
                        'name',
                        'warrantyPeriod',
                        'description',
                        'price',
                    ],
                },
                require: true,
            },
        });

        if (!distributeInformations) {
            return next({
                message: `No distribute information found for store - '${store.id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
            data: distributeInformations,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product list sold
// @route     [GET] /api/product/getAllProducts/sold
// @access    Private/Store
const getAllProductSold = async (req, res, next) => {
    try {
        const store = res.locals.store;

        const orders = await store.getOrders({
            attributes: ['orderDate'],
            include: [
                {
                    model: Product,
                    where: {
                        status: ProductStatus.SOLD,
                    },
                    attributes: ['id', 'productionDate', 'status'],
                    require: true,
                    include: {
                        model: ProductLine,
                        required: true,
                        attributes: [
                            'name',
                            'warrantyPeriod',
                            'description',
                            'price',
                        ],
                    },
                },
                {
                    model: Customer,
                    attributes: ['name', 'address', 'phone'],
                    require: true,
                },
            ],
        });

        if (!orders) {
            return next({
                message: `No order information found for store - '${store.id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product list order
// @route     [GET] /api/product/getAllProducts/Order
// @access    Private/Store
const getAllProductOrder = async (req, res, next) => {
    try {
        const factories = await Store.findAll({
            attributes: ['name', 'address', 'phone'],
            include: Account,
        });

        res.status(200).json({
            success: true,
            data: factories,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product list warranty
// @route     [GET] /api/product/getAllProducts/warranty
// @access    Private/Guarantee
const getAllProductWarranty = async (req, res, next) => {
    try {
        const guarantee = res.locals.guarantee;

        const warrantyInformations = await guarantee.getWarrantyInformations({
            where: {
                warrantyEndTime: null,
            },
            attributes: ['warrantyStartTime'],
            include: [
                {
                    model: Product,
                    where: {
                        status: ProductStatus.WARRANTY,
                    },
                    attributes: ['id', 'productionDate', 'status'],

                    require: true,
                    include: [
                        {
                            model: ProductLine,
                            required: true,
                            attributes: [
                                'name',
                                'warrantyPeriod',
                                'description',
                            ],
                        },
                        {
                            model: Factory,
                            require: true,
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: Customer,
                    attributes: ['name', 'address', 'phone'],
                    require: true,
                },
            ],
        });

        if (!warrantyInformations) {
            return next({
                message: `No warranty information found for guarantee - '${guarantee.id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
            data: warrantyInformations,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get product by id
// @route     [GET] /api/product/:id
// @access    Private
const getProduct = async (req, res, next) => {
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

        if (!product) {
            return next({
                message: `No product found for id - '${req.params.id}'`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return next(error);
    }
};

// @desc      create new product
// @route     [POST] /api/product/create
// @access    Private/Factory
const createProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const productLine = await ProductLine.findByPk(req.body.productLineId, {
            attributes: ['id', 'name', 'warrantyPeriod', 'description'],
        });

        if (!productLine) {
            return next({
                message: `No product line found for id - '${req.body.productLineId}'`,
                statusCode: 404,
            });
        }

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

        res.status(201).json({
            success: true,
            data,
        });

        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(error);
    }
};

// @desc      create new product
// @route     [PATCH] /api/product/:id
// @access    Private
// const updateProduct = async (req, res, next) => {};

// @desc      create new product
// @route     [DELETE] /api/product/:id
// @access    Private/Factory
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return next({
                message: `The product id is incorrect for id - '${id}'`,
                statusCode: 400,
            });
        }

        const factory_id = res.locals.factory.id;

        const deleted = await Product.destroy({
            where: {
                id,
                factory_id,
            },
        });

        if (!deleted) {
            return next({
                message: `The factory does not have product with id - '${id}'`,
                statusCode: 404,
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

// @desc      product distribution
// @route     [PATCH] /api/product/distributed/:id
// @access    Private/Factory
const productDistribution = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return next({
                message: `The product id is incorrect for id - '${product_id}'`,
                statusCode: 400,
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
            return next({
                message: `Product has been delivered for id - '${id}'`,
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            data: distributeInfo,
        });
    } catch (error) {
        await transaction.rollback();
        return next(error);
    }
};

// @desc      sold product
// @route     [PATCH] /api/product/sold/:id
// @access    Private/Store
const soldProduct = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return next({
                message: `The product id is incorrect for id - '${product_id}'`,
                statusCode: 400,
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
            return next({
                message: `Product has been sold for id - '${product_id}'`,
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            data: orderInfo,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return next(error);
    }
};

// @desc      create new product
// @route     [PATCH] /api/product/warranty/:id
// @access    Private/Factory
const productWarranty = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return next({
                message: `The product id is incorrect for id - '${product_id}'`,
                statusCode: 400,
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

        const [warrantyInfo, created] = await WarrantyInformation.findOrCreate({
            where: {
                product_id,
                customer_id: order.customer_id,
                guarantee_id: guaranteeId,
            },
            transaction,
        });

        if (!created) {
            return next({
                message: `Product has been warranty for id - '${product_id}'`,
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            data: warrantyInfo,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return next(error);
    }
};

// @desc      return product
// @route     [PATCH] /api/product/return/:id
// @access    Private/Guarantee
const returnProductAfterWarranty = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return next({
                message: `The product id is incorrect for id - '${product_id}'`,
                statusCode: 400,
            });
        }

        // warrantyStatus = ProductStatus.SOLD || ProductStatus.ERROR
        const { warrantyStatus } = req.body;

        if (
            ![ProductStatus.SOLD, ProductStatus.ERROR].includes(warrantyStatus)
        ) {
            return next({
                message: `warrantyStatus must be '${ProductStatus.SOLD}' or '${ProductStatus.ERROR}'`,
                statusCode: 400,
            });
        }

        const guarantee_id = res.locals.guarantee.id;

        await updateProductStatus(
            product_id,
            ProductStatus.WARRANTY,
            warrantyStatus,
            transaction,
        )();

        const warrantyEndTime = new Date();

        const updated = await WarrantyInformation.update(
            {
                warrantyEndTime,
            },
            {
                where: {
                    product_id,
                    guarantee_id,
                },
                transaction,
            },
        );

        if (!updated[0]) {
            return next({
                message: `Product cannot be ${warrantyStatus}`,
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            data: {
                warrantyEndTime,
                warrantyStatus,
            },
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return next(error);
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
            throw new Error(`Product product was ${newStatus}`);
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
    getAllProductInventory,
    getAllProductError,
    getAllProductDistributed,
    getAllProductSold,
    getAllProductWarranty,
    getProduct,
    createProduct,
    deleteProduct,
    productDistribution,
    soldProduct,
    productWarranty,
    returnProductAfterWarranty,
};
