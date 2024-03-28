const sequelize = require('../config/db');
const { Account, Factory, Store, Guarantee } = require('../models');
const AccountRole = require('../utils/constants/AccountRole');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// @desc      get all account
// @route     [GET] /api/account
// @access    Private/Admin
const getAllAccount = async (req, res, next) => {
    try {
        // let accounts = await Promise.all([
        //     Factory.findAll({
        //         attributes: ['name', 'address', 'phone'],
        //         include: Account,
        //     }),
        //     Store.findAll({
        //         attributes: ['name', 'address', 'phone'],
        //         include: Account,
        //     }),
        //     Guarantee.findAll({
        //         attributes: ['name', 'address', 'phone'],
        //         include: Account,
        //     }),
        // ]);

        // return res.status(200).json({
        //     success: true,
        //     data: [...accounts[0], ...accounts[1], ...accounts[2]],
        // });
        const accounts = await Account.findAll({
            where: {
                role: {
                    [Op.not]: AccountRole.ADMIN,
                },
            },
        });
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @desc      get all account factory
// @route     [GET] /api/account/{:facility}
// @access    Private
const getAllFacility = async (req, res, next) => {
    try {
        const facilityName = req.params.facility;
        let model;
        switch (facilityName) {
            case AccountRole.FACTORY:
                model = Factory;
                break;
            case AccountRole.STORE:
                model = Store;
                break;
            case AccountRole.GUARANTEE:
                model = Guarantee;
                break;
            default:
                throw new Error('account role not exists!');
        }

        const factories = await model.findAll({
            attributes: ['id', 'name', 'address', 'phone'],
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

// @desc      get account
// @route     [GET] /api/account/:id
// @access    Private/Admin
const getAccount = async (req, res, next) => {
    try {
        const account = await Account.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            account,
        });
    } catch (error) {
        next(error);
    }
};

// @desc      create account
// @route     [POST] /api/account
// @access    Private/Admin
const createAccount = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { username, password, role, ...facilityConfig } = req.body;
        const data = {
            username,
            password: await bcrypt.hash(password, 10),
            role,
        };

        const user = await Account.create(data, {
            transaction,
        });

        if (!user) {
            throw new Error('Details are not correct');
        }

        let model;
        switch (role) {
            case AccountRole.FACTORY:
                model = Factory;
                break;
            case AccountRole.STORE:
                model = Store;
                break;
            case AccountRole.GUARANTEE:
                model = Guarantee;
                break;

            default:
                throw new Error('account role not exists!');
        }

        const facility = await model.create(
            {
                ...facilityConfig,
                accountId: user.id,
            },
            {
                transaction,
            },
        );

        if (!facility) {
            throw new Error('create facility failed');
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            data: {
                ...user.toJSON(),
                facility,
            },
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return next(error);
    }
};

// @desc      update account
// @route     [PATCH] /api/account/:id
// @access    Private/Admin
const editAccount = async (req, res, next) => {
    try {
        const updated = await Account.update(
            {
                username: req.body.username,
                password: req.body.password,
                // role: req.body.role,
            },
            {
                where: {
                    account_id: req.params.id,
                },
            },
        );

        if (!updated[0]) {
            throw new Error('update account failed');
        }
        return res.status(201).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

// @desc      delete account
// @route     [DELETE] /api/account/:id
// @access    Private/Admin
const deleteAccount = async (req, res, next) => {
    try {
        const deleteAccount = await Account.destroy({
            where: {
                account_id: req.params.id,
            },
        });

        if (!deleteAccount) {
            throw new Error('Account does not exist');
        }

        return res.status(201).json({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllAccount,
    getAllFacility,
    getAccount,
    createAccount,
    editAccount,
    deleteAccount,
};
