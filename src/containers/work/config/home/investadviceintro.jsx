module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const investAdvicePage = require('../../pages/home/InvestAdviceIntroPage');
        cb(null, investAdvicePage);
    }, 'investadviceintro');
}
