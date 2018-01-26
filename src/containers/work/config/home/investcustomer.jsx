module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const investCustomerPage = require('../../pages/home/InvestCustomerPage');
        cb(null, investCustomerPage);
    }, 'investcustomer');
}
