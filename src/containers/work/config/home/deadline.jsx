module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const productDeadlinePage = require('../../pages/home/ProductDeadlinePage');
        cb(null, productDeadlinePage);
    }, 'homedeadline');
}
