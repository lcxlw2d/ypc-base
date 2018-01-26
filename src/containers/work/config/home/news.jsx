module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const NewsCenterPage = require('../../pages/home/NewsCenterPage');
        cb(null, NewsCenterPage);
    }, 'news');
}
