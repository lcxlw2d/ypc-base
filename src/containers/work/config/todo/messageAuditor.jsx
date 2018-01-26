module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const auditorPage = require('../../pages/todo/MessageAuditorPage');
        cb(null, auditorPage)
    }, 'todoMessageAuditor');
}
