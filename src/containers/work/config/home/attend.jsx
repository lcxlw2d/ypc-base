module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AttendPage = require('../../pages/home/AttendPage');
        cb(null, AttendPage);
    }, 'attend');
}
