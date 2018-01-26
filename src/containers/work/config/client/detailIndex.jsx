module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const detailIndexPage = require('../../pages/client/DetailIndexPage');
        cb(null, detailIndexPage)
    }, 'detailIndex')
}
