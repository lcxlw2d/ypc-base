module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const KingGloryTop = require('../../pages/home/KingGloryTopPage');
        cb(null,KingGloryTop);
    }, 'top');
}
