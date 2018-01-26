module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const complainPage = require('../../pages/me/ComplainPage');
        cb(null, complainPage)
    }, 'complain')
}
