module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const koujingPage = require('../../pages/home/KouJingPage');
        cb(null, koujingPage);
    }, 'margin');
}
