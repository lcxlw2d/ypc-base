module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const indexPage = require('../pages/IndexPage');
        cb(null, indexPage);
    }, 'work');
}
