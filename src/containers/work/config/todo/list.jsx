module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const detailPage = require('../../pages/todo/ListPage');
        cb(null, detailPage)
    }, 'listDetail')
}
