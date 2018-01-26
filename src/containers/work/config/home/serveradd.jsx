module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const serverAddPage = require('../../pages/client/ServerConAddPage');
        cb(null, serverAddPage)
    }, 'homeserveradd');
}
