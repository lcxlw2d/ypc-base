module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const serverDetailPage = require('../../pages/client/ServerDetailPage');
        cb(null, serverDetailPage)
    }, 'clientserverdetail');
}
