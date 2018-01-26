module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const recordPage = require('../../pages/client/RecordPage');
        cb(null, recordPage)
    }, 'record')
}