module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const KingGloryRank = require('../../pages/home/KingGloryRankPage');
        cb(null,KingGloryRank);
    }, 'KingGloryRank');
}