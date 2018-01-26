module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const newStockPage = require('../../pages/home/NewStockPage');
        cb(null, newStockPage);
    }, 'newstock');
}
