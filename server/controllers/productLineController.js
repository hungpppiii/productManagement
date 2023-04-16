const getProductLines = async (req, res, next) => {
    try {
        res.send('Danh sách dòng sản phẩm');
    } catch (error) {}
};

const getProductLine = async (req, res, next) => {
    try {
        console.log('productLineID', req.params.id);
        res.send(`Dòng sản phẩm có id: ${req.params.id}`);
    } catch (error) {}
};

module.exports = {
    getProductLines,
    getProductLine,
};
