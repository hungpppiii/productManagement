const authRouter = require('./auth');
const accountRouter = require('./account');
const productRouter = require('./product');
const productLineRouter = require('./productLine');
const { verifyAccount } = require('../middlewares/authMiddleware');

const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/account', verifyAccount, accountRouter);
    app.use('/api/product', verifyAccount, productRouter);
    app.use('/api/productLine', verifyAccount, productLineRouter);
};

module.exports = route;
