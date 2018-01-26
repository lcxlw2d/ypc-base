module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const detailApprovedPage = require('../../pages/todo/DetailApprovedPage');
        cb(null, detailApprovedPage)
    }, 'todoDetailApproved')
}
