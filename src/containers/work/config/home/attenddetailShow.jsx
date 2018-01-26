module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AttendDetailShowPage = require('../../pages/home/AttendDetailShowPage');
        cb(null, AttendDetailShowPage);
    }, 'attenddetailshow');
}
