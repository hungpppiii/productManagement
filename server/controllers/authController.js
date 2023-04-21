const { Account } = require('../models');
const jwt = require('jsonwebtoken');

// @desc      Login
// @route     [POST] /api/auth/login
// @access    Public
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(500).send({
                message: 'Missing account or password',
            });
        }

        const account = await Account.findOne({
            where: {
                username,
                password,
            },
        });

        if (!account) {
            return next({
                message: 'Account does not exist',
            });
        }

        const token = jwt.sign(
            {
                accountId: account.id,
            },
            process.env.SECRET_KEY,
        );

        res.cookie('token', token);

        res.status(200).json({
            token,
            accountRole: account.role,
        });
    } catch (error) {
        next(error);
    }
};

// @desc      Register
// @route     [POST] /api/auth/register
// @access    Public
const register = async (req, res) => {
    res.send('This feature has not been updated yet');
};

module.exports = {
    login,
    register,
};
