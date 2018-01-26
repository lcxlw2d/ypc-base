module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const stockOfflinePage = require('../../pages/home/StockOfflinePage');
        cb(null, stockOfflinePage);
    }, 'stockoffline');
}
