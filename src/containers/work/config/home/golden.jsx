module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const goldenPage = require('../../pages/home/GoldenPage');
        cb(null, goldenPage);
    }, 'golden');
}
