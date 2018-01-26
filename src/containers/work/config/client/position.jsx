module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const positionPage = require('../../pages/client/PositionPage.jsx');
        cb(null, positionPage)
    }, 'position')
}
