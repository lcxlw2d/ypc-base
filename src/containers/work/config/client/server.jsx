module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const serverPage = require('../../pages/client/ServerPage');
        cb(null, serverPage)
    }, 'clientserver');
}
