module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const profitPage = require('../../pages/client/ProfitPage');
        cb(null, profitPage)
    }, 'profit')
}
