module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const BroductSeatch = require('../../components/home/investadvice/BroductSearch');
        cb(null,BroductSeatch);
    }, 'broductseatch');
}