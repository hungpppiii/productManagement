const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

async function setupConnectDB() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            alter: true,
        });
        console.log('Database Connection successfully.');
    } catch (error) {
        console.log('Connection failure!');
        console.log(error);
        process.exit();
    }
}

async function init() {
    await setupConnectDB();
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

init();