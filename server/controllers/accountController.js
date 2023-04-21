const sequelize = require('../config/db');
const { Account, Factory, Store, Guarantee } = require('../models');
const AccountRole = require('../utils/constants/AccountRole');
const { Op } = require('sequelize');

const getAllAccount = async (req, res, next) => {
    try {
        const accounts = await Account.findAll({
            where: {
                role: {
                    [Op.not]: AccountRole.ADMIN,
                },
            },
        });

        return res.status(200).json({
            success: true,
            data: accounts,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const getAllFactory = async (req, res, next) => {
    try {
        const factories = await Factory.findAll({
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

const getAllStore = async (req, res, next) => {
    try {
        const stores = await Store.findAll({
            attributes: ['name', 'address', 'phone'],
            include: Account,
        });

        res.status(200).json({
            success: true,
            data: stores,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const getAllGuarantee = async (req, res, next) => {
    try {
        const guarantees = await Guarantee.findAll({
            attributes: ['name', 'address', 'phone'],
            include: Account,
        });

        res.status(200).json({
            success: true,
            data: guarantees,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

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

const createAccount = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { username, password, role, ...facilityConfig } = req.body;
        const data = {
            username,
            //   password: await bcrypt.hash(password, 10),
            password,
            role,
        };

        const user = await Account.create(data, {
            transaction,
        });

        if (!user) {
            throw new Error('Details are not correct');
        }

        let facility;
        switch (role) {
            case AccountRole.FACTORY:
                facility = await Factory.create(
                    {
                        ...facilityConfig,
                        accountId: user.id,
                    },
                    {
                        transaction,
                    },
                );
                break;
            case AccountRole.STORE:
                facility = await Store.create(
                    {
                        ...facilityConfig,
                        accountId: user.id,
                    },
                    {
                        transaction,
                    },
                );

                break;
            case AccountRole.GUARANTEE:
                facility = await Guarantee.create(
                    {
                        ...facilityConfig,
                        accountId: user.id,
                    },
                    {
                        transaction,
                    },
                );
                break;

            default:
                throw new Error('account role not exists!');
        }

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
                    account_id: req.params.id,
                },
            },
        );
        if (update[0] === 1) {
            throw new Error('update account failed');
        }
        return res.status(201).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const deleteAccount = await Account.destroy({
            where: {
                account_id: req.params.id,
            },
        });

        if (!deleteAccount) {
            throw new Error('Product does not exist');
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
    getAllFactory,
    getAllStore,
    getAllGuarantee,
    getAccount,
    createAccount,
    editAccount,
    deleteAccount,
};
