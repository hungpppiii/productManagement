const { response } = require('express');
const { Account, Factory, Store, Guarantee } = require('../models');
const accountRule = require('../utils/constants/AccountRule');
const jwt = require('jsonwebtoken');

const verifyAccount = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).send('Not authorize to access this route');
    }

    try {
        const { accountId } = jwt.verify(token, process.env.SECRET_KEY);

        const account = await Account.findByPk(accountId);

        if (!account) {
            return res.status(401).send('Not authorize to access this route 1');
        }

        req.accountId = account.id;
        req.accountRole = account.role;

        next();
    } catch (error) {
        return res.status(401).send('Not authorize to access this route');
    }
};

const verifyAdmin = async (req, res, next, value) => {
    try {
        if (req.accountRole !== accountRule.ADMIN) {
            return res
                .status(403)
                .send(
                    `User role ${res.locals.accountRole} is not authorized to access this routes`,
                );
        }
        next();
    } catch (error) {
        res.status(400).send('error user authentication');
    }
};

const verifyFactory = async (req, res, next) => {
    try {
        if (req.accountRole !== accountRule.FACTORY) {
            return res
                .status(403)
                .send(
                    `User role ${res.locals.accountRole} is not authorized to access this routes`,
                );
        }

        const factory = await Factory.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!factory) {
            return res.status(400).send('error user authentication');
        }
        req.factoryId = factory.id;

        next();
    } catch (error) {
        res.status(400).send('error user authentication');
    }
};

const verifyStore = async (req, res, next) => {
    try {
        if (req.accountRole !== accountRule.STORE) {
            return res
                .status(403)
                .send(
                    `User role ${res.locals.accountRole} is not authorized to access this routes`,
                );
        }

        const store = await Store.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!store) {
            return res.status(400).send('error user authentication');
        }

        req.storeId = store.id;

        next();
    } catch (error) {
        res.status(400).send('error user authentication');
    }
};

const verifyGuarantee = async (req, res, next) => {
    try {
        if (req.accountRole !== accountRule.GUARANTEE) {
            return res
                .status(403)
                .send(
                    `User role ${res.locals.accountRole} is not authorized to access this routes`,
                );
        }

        const guarantee = await Guarantee.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!guarantee) {
            return res.status(400).send('error user authentication');
        }
        req.guaranteeId = guarantee.id;

        next();
    } catch (error) {
        res.status(400).send('error user authentication');
    }
};

module.exports = {
    verifyAccount,
    verifyAdmin,
    verifyFactory,
    verifyStore,
    verifyGuarantee,
};
