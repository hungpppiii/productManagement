const { Account, Factory, Store, Guarantee } = require('../models');
const AccountRole = require('../utils/constants/AccountRole');
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
        return res.status(401).json({
            error: 'Not authorize to access this route',
        });
    }

    try {
        const { accountId } = jwt.verify(token, process.env.SECRET_KEY);

        const account = await Account.findByPk(accountId);

        if (!account) {
            return res.status(401).json({
                error: 'Not authorize to access this route',
            });
        }

        req.accountId = account.id;
        req.accountRole = account.role;

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Not authorize to access this route',
        });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        if (req.accountRole !== AccountRole.ADMIN) {
            return res.status(403).json({
                error: `User role ${res.locals.accountRole} is not authorized to access this routes`,
            });
        }
        next();
    } catch (error) {
        res.status(400).json({
            error: 'error user authentication',
        });
    }
};

const verifyFactory = async (req, res, next) => {
    try {
        if (req.accountRole !== AccountRole.FACTORY) {
            return res.status(403).json({
                error: `User role ${res.locals.accountRole} is not authorized to access this routes`,
            });
        }

        const factory = await Factory.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!factory) {
            throw new Error();
        }

        res.locals.factory = factory;

        next();
    } catch (error) {
        res.status(400).json({
            error: 'error user authentication',
        });
    }
};

const verifyStore = async (req, res, next) => {
    try {
        if (req.accountRole !== AccountRole.STORE) {
            return res.status(403).json({
                error: `User role ${res.locals.accountRole} is not authorized to access this routes`,
            });
        }

        const store = await Store.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!store) {
            throw new Error();
        }

        res.locals.store = store;

        next();
    } catch (error) {
        res.status(400).json({
            error: 'error user authentication',
        });
    }
};

const verifyGuarantee = async (req, res, next) => {
    try {
        if (req.accountRole !== AccountRole.GUARANTEE) {
            return res.status(403).json({
                error: `User role ${res.locals.accountRole} is not authorized to access this routes`,
            });
        }

        const guarantee = await Guarantee.findOne({
            where: {
                accountId: req.accountId,
            },
        });

        if (!guarantee) {
            throw new Error();
        }

        res.locals.guarantee = guarantee;

        next();
    } catch (error) {
        res.status(400).json({
            error: 'error user authentication',
        });
    }
};

module.exports = {
    verifyAccount,
    verifyAdmin,
    verifyFactory,
    verifyStore,
    verifyGuarantee,
};
