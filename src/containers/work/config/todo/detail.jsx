module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const detailPage = require('../../pages/todo/DetailPage');
        cb(null, detailPage)
    }, 'todoDetail')
}
