module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const resetGesturePage = require('../../pages/me/ResetGesturePage');
        cb(null, resetGesturePage);
    }, 'resetGesture');
}
