module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const goldenPage = require('../../pages/home/AnualBillPage');
        cb(null, goldenPage);
    }, 'anualbill');
}
