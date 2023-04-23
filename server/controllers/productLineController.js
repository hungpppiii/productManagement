const { ProductLine } = require('../models');

// @desc      get all product line
// @route     [POST] /api/productLine/getAllProductLine
// @access    Private
const getAllProductLine = async (req, res, next) => {
    try {
        const productLines = await ProductLine.findAll();
        res.status(200).json({
            success: true,
            data: productLines,
        });
    } catch (error) {
        next(error);
    }
};

// @desc      get all product line
// @route     [POST] /api/productLine/create
// @access    Private/Admin
const createProductLine = async (req, res, next) => {
    try {
        const productLine = await ProductLine.create({
            name: req.body.name,
            price: req.body.price,
            warrantyPeriod: req.body.warrantyPeriod,
            description: req.body.description,
        });

        if (!productLine) {
            throw new Error('Details are not correct');
        }

        return res.status(201).send({
            success: true,
            data: productLine,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      update product line
// @route     [PATCH] /api/productLine/:id
// @access    Private/Admin
const updateProductLine = async (req, res, next) => {
    try {
        const update = await ProductLine.update(
            {
                name: req.body.name,
                price: req.body.price,
                warrantyPeriod: req.body.warranty_period,
                description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        res.json(update);

        // if (!update[0]) {
        //     return next({
        //         message: `update product line failed for productLineId - ${req.params.id}`,
        //     });
        // }

        // return res.status(201).send({
        //     success: true,
        // });
    } catch (error) {
        return next(error);
    }
};

// @desc      update product line
// @route     [DELETE] /api/productLine/:id
// @access    Private/Admin
const deleteProductLine = async (req, res, next) => {
    try {
        const deleteProductLine = await ProductLine.destroy({
            where: {
                product_line_id: req.params.id,
            },
        });
        if (!deleteProductLine) {
            return next({
                message: `delete product line failed for id - ${req.params.id}`,
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllProductLine,
    createProductLine,
    updateProductLine,
    deleteProductLine,
};
