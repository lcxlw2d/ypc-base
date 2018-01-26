module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AttendMap = require('../../pages/home/AttendMapPage');
        cb(null, AttendMap);
    }, 'showmap');
}
