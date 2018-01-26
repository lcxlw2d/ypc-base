module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const offlineDetailPage = require('../../pages/home/OfflineDetailPage');
        cb(null, offlineDetailPage);
    }, 'offlinedetail');
}
