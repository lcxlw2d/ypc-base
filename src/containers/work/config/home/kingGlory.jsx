module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const KingGlory = require('../../pages/home/KingGloryPage');
        cb(null,KingGlory);
    }, 'kingGlory');
}
