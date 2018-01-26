module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const serverAddPage = require('../../pages/client/ServerAddConnect');
        cb(null, serverAddPage)
    }, 'clientserveradd');
}
