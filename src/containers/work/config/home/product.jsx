module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const timeMachinePage = require('../../pages/home/TimeMachinePage');
        cb(null, timeMachinePage);
    }, 'homeproduct');
}
