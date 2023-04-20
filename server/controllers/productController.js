const {
    Product,
    ProductLine,
    DistributeInformation,
    Customer,
    Order,
    WarrantyInformation,
    Guarantee,
} = require('../models');
const sequelize = require('../config/db');
const ProductStatus = require('../utils/constants/ProductStatus');
const AccountRule = require('../utils/constants/AccountRule');

// @desc      get product list inventory
// @route     [GET] /api/product/getAllProducts/inventory
// @access    Private/Factory
const getAllProductInventory = async (req, res) => {
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
            throw new Error();
        }

        return res.status(200).json({
            message: 'get products successfully',
            data: products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

// @desc      get product list error
// @route     [GET] /api/product/getAllProducts/error
// @access    Private/Factory
const getAllProductError = async (req, res) => {
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
            throw new Error();
        }

        return res.status(200).json({
            message: 'get products successfully',
            data: products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

// @desc      get product list distributed
// @route     [GET] /api/product/getAllProducts/distributed
// @access    Private/Store
const getAllProductDistributed = async (req, res) => {
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
                    attributes: ['name', 'warrantyPeriod', 'description'],
                },
                require: true,
            },
        });

        if (!distributInformations) {
            throw new Error();
        }

        // const products = distributeInformations.map(
        //     (distributeInfo) => {
        //         const product = distributeInfo.toJSON().Product;
        //         product.distributionDate = distributeInfo.distributionDate;
        //         return product
        //     }
        // );

        return res.status(200).json({
            message: 'get products successfully',
            data: distributeInformations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

// @desc      get product list sold
// @route     [GET] /api/product/getAllProducts/sold
// @access    Private/Store
const getAllProductSold = async (req, res) => {
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
                        attributes: ['name', 'warrantyPeriod', 'description'],
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
            throw new Error();
        }

        return res.status(200).json({
            message: 'get products successfully',
            data: orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

// @desc      get product list warranty
// @route     [GET] /api/product/getAllProducts/warranty
// @access    Private/Guarantee
const getAllProductWarranty = async (req, res) => {
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
                    include: {
                        model: ProductLine,
                        required: true,
                        attributes: ['name', 'warrantyPeriod', 'description'],
                    },
                },
                {
                    model: Customer,
                    attributes: ['name', 'address', 'phone'],
                    require: true,
                },
            ],
        });

        if (!warrantyInformations) {
            throw new Error();
        }

        return res.status(200).json({
            message: 'get products successfully',
            data: warrantyInformations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `get product failed: ${error}`,
        });
    }
};

// @desc      get product by id
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
            message: `Change the product status to successfully ${ProductStatus.WARRANTY}`,
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

const returnProductAfterWarranty = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product_id = req.params.id;

        if (isNaN(parseInt(product_id))) {
            return res.status(400).json({
                error: 'The product id is incorrect',
            });
        }

        // warrantyStatus = ProductStatus.SOLD || ProductStatus.ERROR
        const { warrantyStatus } = req.body;

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
                },
                transaction,
            },
        );

        if (!updated[0]) {
            throw new Error(`Product cannot be ${warrantyStatus}`);
        }

        await transaction.commit();

        return res.status(200).json({
            message: `Change the product status to successfully ${warrantyStatus}`,
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
    updateProduct,
    deleteProduct,
    productDistribution,
    soldProduct,
    productWarranty,
    returnProductAfterWarranty,
};
