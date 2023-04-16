const authRouter = require('./auth');
const accountRouter = require('./account');
const productRouter = require('./product');
const productLineRouter = require('./productLine');

const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/products', productRouter);
    app.use('/api/productLines', productLineRouter);
};

module.exports = route;
