module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const summaryPage = require('../../pages/client/SummaryPage');
        cb(null, summaryPage)
    }, 'summary')
}
