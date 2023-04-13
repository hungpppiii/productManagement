const factoryRouter = require('./factory');
const storeRouter = require('./store');
const guaranteeRouter = require('./guarantee');
const adminRouter = require('./admin');
const authRouter = require('./auth');

const route = (app) => {
    app.use('/api/factory', factoryRouter);
    app.use('/api/store', storeRouter);
    app.use('/api/guarantee', guaranteeRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/', authRouter);
};

module.exports = route;
