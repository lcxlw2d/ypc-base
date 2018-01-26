module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const KingGloryCompanyRank = require('../../pages/home/KingGloryCompanyRankPage');
        cb(null,KingGloryCompanyRank);
    }, 'KingGloryCompanyRank');
}