module.exports = store => (nextState, cb) => {
    require.ensure([], require => {
        const recordPage = require('../../pages/client/AddPotentialPage');
        cb(null, recordPage)
    }, 'addPotential')
}
