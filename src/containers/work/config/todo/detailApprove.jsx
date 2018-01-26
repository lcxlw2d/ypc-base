module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const detailApprovePage = require('../../pages/todo/DetailApprovePage');
        cb(null, detailApprovePage)
    }, 'todoDetailApprove')
}
