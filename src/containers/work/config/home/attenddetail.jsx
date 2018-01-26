module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AttendDetailPage = require('../../pages/home/AttendDetailPage');
        cb(null, AttendDetailPage);
    }, 'attenddetail');
}
