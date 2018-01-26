module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const aboutPage = require('../../pages/me/AboutPage');
        cb(null, aboutPage)
    }, 'about')
}
