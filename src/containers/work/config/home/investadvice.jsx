module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const investAdvicePage = require('../../pages/home/InvestAdvicePage');
        cb(null, investAdvicePage);
    }, 'investadvice');
}
