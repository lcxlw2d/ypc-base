import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const clientPage = require('../pages/client/ClientPage');
        const clientReducer = require('../reducers/client/clientReducer');
        injectReducer(store, {
            client:clientReducer
        });
        cb(null, clientPage)
    }, 'client')
}
