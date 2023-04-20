const { Guarantee, WarrantyInformation } = require('../models');
const sequelize = require('../config/db');

const getInfoGuarantee = async (req, res) => {
    try {
        const guarantee = await Guarantee.findOne({
            where: {
                account_id: req.params.accountID,
            },
        });
        res.json(guarantee);
    } catch (err) {
        return res.status(409).send({
            error: err,
        });
    }
};

const editInfoGuarantee = async (req, res) => {
    try {
        const update = await Guarantee.update(
            {
                name: req.body.guarantee_name,
                address: req.body.address,
                phone: req.body.phone,
            },
            {
                where: {
                    account_id: req.params.accountID,
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
            error: error,
        });
    }
};

const getAllProductWarranty = async (req, res, next) => {
    try {
        const products = await sequelize.query(
            'SELECT w.*, pl.name, c.customer_name\
      FROM warranty_information w\
      join product p on p.product_id = w.product_id\
      join product_line pl on pl.product_line_id = p.product_line_id\
      join customer c on c.customer_id = w.customer_id\
      where guarantee_id = :guarantee_id;',
            {
                replacements: {
                    guarantee_id: req.params.guaranteeID,
                },
            },
        );
        const s = products[0];
        res.status(200).send(s);
    } catch (err) {
        return res.status(409).send({
            error: err,
        });
    }
};

const editProduct = async (req, res, next) => {
    try {
        const update = await WarrantyInformation.update(
            {
                status: req.body.status,
            },
            {
                where: {
                    product_id: req.params.productID,
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
        // BankingModel.destroy({
        //   where: {
        //     credit_card_number: req.body.old_credit_card,
        //   },
        // });
    } catch (error) {
        return res.status(409).send({
            error: error,
        });
    }
};

module.exports = {
    getInfoGuarantee,
    editInfoGuarantee,
    getAllProductWarranty,
    editProduct,
};
