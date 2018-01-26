module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const NewsDetailPage = require('../../pages/home/NewsDetailPage');
        cb(null, NewsDetailPage);
    }, 'newsdetail');
}
