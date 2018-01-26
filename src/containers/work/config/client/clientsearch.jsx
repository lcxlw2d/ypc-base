module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const searchPage = require('../../pages/client/SearchPage');
        cb(null, searchPage)
    }, 'clientsearch')
}
