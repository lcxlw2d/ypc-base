import {injectReducer} from '../../../../store/reducers';
module.exports = store => (nextState, cb) => {
    require.ensure([], require => {
        const PotentialDetailPage = require('../../pages/client/PotentialDetailPage');
        // const potentialReducer = require('../../../../routes/work/reducers/client/potentialReducer');
        // injectReducer(store, {
        //     potential:potentialReducer
        // });
        cb(null, PotentialDetailPage)
    }, 'potentialDetail')
}
