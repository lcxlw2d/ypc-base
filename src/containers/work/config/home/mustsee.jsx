module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const mustSeePage = require('../../pages/home/MustSeePage');
        cb(null, mustSeePage);
    }, 'mustsee');
}