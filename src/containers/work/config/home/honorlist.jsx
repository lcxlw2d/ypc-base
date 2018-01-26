module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const HonorlistPage = require('../../pages/home/HonorlistPage');
        cb(null, HonorlistPage);
    }, 'honorlist');
}
