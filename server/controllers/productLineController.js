const { ProductLine } = require('../models');
const sequelize = require('../config/db');

const getAllProductLine = async (req, res, next) => {
    try {
        const productLines = await ProductLine.findAll();
        res.json(productLines);
    } catch (error) {
        return res.status(409).send({
            error,
        });
    }
};

const addProductLine = async (req, res, next) => {
    const data = {
        name: req.body.name,
        price: req.body.price,
        warranty_period: req.body.warranty_period,
        description: req.body.description,
    };

    // check dublicate username
    const productLineData = await ProductLine.findOne({
        where: {
            name: req.body.name,
        },
    });

    if (productLineData !== null) {
        return res.status(409).send({
            message: 'This name productLine already exists',
        });
    } else {
        // saving the user
        const productLine = await ProductLine.create(data);
        if (productLine) {
            return res.status(201).send({
                productLine: productLine,
                message: 'ProductLine registered successfully.',
            });
        } else {
            return res.status(409).send({
                message: 'Details are not correct',
            });
        }
    }
};

const editProductLine = async (req, res, next) => {
    try {
        const update = await ProductLine.update(
            {
                name: req.body.name,
                price: req.body.price,
                warranty_period: req.body.warranty_period,
                description: req.body.description,
            },
            {
                where: {
                    product_line_id: req.params.id,
                },
            },
        );
        if (update[0] === 1) {
            return res.status(201).send({
                message: 'Update successfully.',
            });
        } else {
            return res.status(201).send({
                message: 'Update fail',
            });
        }
    } catch (error) {
        return res.status(409).send({
            error,
        });
    }
};

const deleteProductLine = async (req, res, next) => {
    try {
        const deleteProductLine = await ProductLine.destroy({
            where: {
                product_line_id: req.params.id,
            },
        });
        if (deleteProductLine === 1) {
            return res.status(201).send({
                message: 'Delete productLine successfully.',
            });
        } else {
            return res.status(201).send({
                deleteProductLine: deleteProductLine,
                message: 'Delete productLine fail',
            });
        }
    } catch (error) {
        return res.status(409).send({
            error,
        });
    }
};

module.exports = {
    getAllProductLine,
    addProductLine,
    editProductLine,
    deleteProductLine,
};
