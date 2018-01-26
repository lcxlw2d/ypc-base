module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const marginPage = require('../../pages/home/MarginPage');
        cb(null, marginPage);
    }, 'margin');
}
