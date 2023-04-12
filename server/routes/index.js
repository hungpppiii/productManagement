const factoryRouter = require('./factory');

const route = (app) => {
    app.use('/factory', factoryRouter);
    app.get('/', (req, res) => {
        res.send("Hello!")
    })
}

module.exports = route;