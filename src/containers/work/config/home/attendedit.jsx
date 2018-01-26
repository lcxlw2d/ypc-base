module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const attendEditPage = require('../../pages/home/AttendEditPage');
        cb(null, attendEditPage);
    }, 'attendedit');
}
