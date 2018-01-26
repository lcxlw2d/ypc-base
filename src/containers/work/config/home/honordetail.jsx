module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const HonordetailPage = require('../../pages/home/HonordetailPage');
        cb(null, HonordetailPage);
    }, 'honordetail');
}
