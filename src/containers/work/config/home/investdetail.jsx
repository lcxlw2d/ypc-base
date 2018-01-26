module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const InvestDetail = require('../../pages/home/InvestDetailPage');
        cb(null,InvestDetail);
    }, 'investdetail');
}