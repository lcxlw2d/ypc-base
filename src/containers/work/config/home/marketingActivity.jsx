module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const productDeadlinePage = require('../../pages/home/MarketingActivityPage');
        cb(null, productDeadlinePage);
    }, 'marketingActivity');
}
