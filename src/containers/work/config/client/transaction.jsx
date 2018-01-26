module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const transactionPage = require('../../pages/client/TransactionPage');
        cb(null, transactionPage)
    }, 'transaction')
}
