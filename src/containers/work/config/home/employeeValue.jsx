module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const EmployeeValuePage = require('../../pages/home/EmployeeValuePage');
        cb(null, EmployeeValuePage);
    }, 'employeeValue');
}
