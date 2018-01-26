module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const BroductPage = require('../../pages/home/BroductPage');
        cb(null, BroductPage);
    }, 'broduct');
}