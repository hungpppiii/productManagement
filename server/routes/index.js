const authRouter = require('./auth');
const accountRouter = require('./account');
const productRouter = require('./product');
const productLineRouter = require('./productLine');
const guaranteeRouter = require('./guarantee');

const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productLine', productLineRouter);
    app.use('/api/guarantee', guaranteeRouter);
};

module.exports = route;
