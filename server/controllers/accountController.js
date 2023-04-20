const { response } = require('express');
const { Account, Factory, Store, Guarantee } = require('../models');
const AccountRule = require('../utils/constants/AccountRule');
const { Op } = require('sequelize');

const getAllAccount = async (req, res, next) => {
    try {
        console.log('get all');
        const accounts = await Account.findAll({
            where: {
                role: {
                    [Op.not]: AccountRule.ADMIN,
                },
            },
        });
        res.json(accounts);
    } catch (err) {
        console.log(err);
        return res.status(409).send({
            error: err,
        });
    }
};

const findOne = async (req, res, next) => {
    try {
        const accounts = await Account.findByPk(req.params.accountID);
        res.json(accounts);
    } catch (err) {
        return res.status(409).send({
            error: err,
        });
    }
};

const addAccount = async (req, res, next) => {
    try {
        const { username, password, role, ...facilityConfig } = req.body;
        const data = {
            username,
            //   password: await bcrypt.hash(password, 10),
            password,
            role,
        };

        // check dublicate username
        const userData = await Account.findOne({
            where: {
                username: username,
            },
        });

        if (userData !== null) {
            return res.status(409).send({
                message: 'This username already exists',
            });
        } else {
            // saving the user
            const user = await Account.create(data);
            if (user) {
                // return res.status(201).send({
                //   user: user,
                //   message: "User registered successfully.",
                // });
                let facility;
                switch (role) {
                    case AccountRule.FACTORY:
                        facility = await Factory.create({
                            ...facilityConfig,
                            accountId: user.id,
                        });
                        break;
                    case AccountRule.STORE:
                        facility = await Store.create({
                            ...facilityConfig,
                            accountId: user.id,
                        });

                        break;
                    case AccountRule.GUARANTEE:
                        facility = await Guarantee.create({
                            ...facilityConfig,
                            accountId: user.id,
                        });
                        break;

                    default:
                        facility = { bug: 'bug' };
                        break;
                }
                console.log(facility);
                return res.json({
                    message: 'success',
                    data: {
                        ...user.toJSON(),
                        facility,
                    },
                });
            } else {
                return res.status(409).send({
                    message: 'Details are not correct',
                });
            }
        }
    } catch (error) {
        return res.status(409).send({
            error: error,
        });
    }
};

const editAccount = async (req, res, next) => {
    try {
        const update = await Account.update(
            {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
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

const deleteAccount = async (req, res, next) => {
    try {
        const deleteAccount = await Account.destroy({
            where: {
                account_id: req.params.accountID,
            },
        });
        if (deleteAccount === 1) {
            return res.status(201).send({
                message: 'Delete account successfully.',
            });
        } else {
            return res.status(201).send({
                deleteAccount: deleteAccount,
                message: 'Delete account fail',
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
    getAllAccount,
    findOne,
    addAccount,
    editAccount,
    deleteAccount,
};
