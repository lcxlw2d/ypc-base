module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const statisticsPage = require('../../pages/home/statisticsPage');
        cb(null, statisticsPage);
    }, 'statistics');
}
