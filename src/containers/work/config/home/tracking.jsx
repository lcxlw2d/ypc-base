module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const trackingPage = require('../../pages/home/TrackingPage');
        cb(null, trackingPage);
    }, 'tracking');
}