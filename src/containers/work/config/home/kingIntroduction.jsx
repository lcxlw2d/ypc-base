module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const KingIntroduction = require('../../pages/home/KingIntroductionPage');
        cb(null,KingIntroduction);
    }, 'KingIntroduction');
}